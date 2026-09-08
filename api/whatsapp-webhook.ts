import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  verifyWebhookChallenge,
  extractIncomingMessage,
  generateReply,
  sendWhatsAppMessage,
} from '../src/lib/whatsappBot';

// Webhook de WhatsApp Cloud API (Meta) para el agente de catálogo de LVSM.
//
// GET  -> handshake de verificación (Meta lo llama una sola vez, al configurar
//         la URL del webhook en el panel de desarrolladores).
// POST -> mensaje entrante real: genera la respuesta con Claude y la manda
//         de vuelta por WhatsApp.
//
// Variables de entorno requeridas (ver .env.example):
//   WHATSAPP_VERIFY_TOKEN   — inventado por vos, se usa solo en el handshake
//   WHATSAPP_TOKEN          — token de acceso permanente de Meta
//   WHATSAPP_PHONE_NUMBER_ID — ID del número de WhatsApp (no el número en sí)
//   ANTHROPIC_API_KEY       — API key de Anthropic

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    if (!verifyToken) {
      res.status(500).send('WHATSAPP_VERIFY_TOKEN no configurado');
      return;
    }
    const challenge = verifyWebhookChallenge(req.query, verifyToken);
    if (challenge) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Verificación fallida');
    }
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // Meta espera un 200 rápido; cualquier error se loguea pero no se
  // reintenta con un mensaje de vuelta al usuario para no generar ruido.
  try {
    const incoming = extractIncomingMessage(req.body);
    if (!incoming) {
      res.status(200).send('ok'); // eventos que no son mensajes de texto (status, etc.)
      return;
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const token = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    if (!apiKey || !token || !phoneNumberId) {
      console.error('Faltan variables de entorno del agente de WhatsApp');
      res.status(200).send('ok');
      return;
    }

    // v1: sin memoria persistida entre mensajes (cada pregunta se responde
    // en base al catálogo, sin recordar turnos anteriores). Si hace falta
    // conversación multi-turno, el próximo paso es sumar Vercel KV acá.
    const reply = await generateReply({ apiKey, userMessage: incoming.text });
    await sendWhatsAppMessage({ to: incoming.from, text: reply, token, phoneNumberId });

    res.status(200).send('ok');
  } catch (err) {
    console.error('Error en el webhook de WhatsApp:', err);
    res.status(200).send('ok'); // 200 igual: evita que Meta reintente en loop
  }
}
