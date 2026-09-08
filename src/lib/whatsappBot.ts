import Anthropic from '@anthropic-ai/sdk';
import { STATIC_PRODUCTS, type Product } from '../data/products';
import { WHATSAPP_PHONE } from './whatsapp';

// Agente de WhatsApp para LVSM — responde preguntas de catálogo (precio,
// stock, modelos, estado) usando el mismo catálogo que ve el sitio.
//
// Diseñado a propósito para que ESTA parte (el "cerebro") sea independiente
// de la función serverless que la conecta a Meta: así se puede testear con
// vitest sin necesitar credenciales de WhatsApp ni desplegar nada.

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** Resumen del catálogo en texto plano para dárselo al modelo como contexto. */
export function buildCatalogContext(products: Product[] = STATIC_PRODUCTS): string {
  return products
    .map((p) => {
      const price = p.priceNumber != null ? `$${p.priceNumber.toLocaleString('es-AR')}` : 'Consultar';
      return `- ${p.brand} ${p.name} (${p.type}) — Precio: ${price} — Estado: ${p.condition} — Material: ${p.material} — Incluye: ${p.includes.join(', ') || 'sin accesorios adicionales'}`;
    })
    .join('\n');
}

export function buildSystemPrompt(products: Product[] = STATIC_PRODUCTS): string {
  return `Sos el asistente de WhatsApp de LVSM (The Collective), una tienda argentina de reventa de carteras de lujo originales y autenticadas.

Tu único trabajo es responder preguntas sobre el catálogo: precio, stock, estado, materiales y qué incluye cada pieza. Usá SOLO la información del catálogo de abajo — nunca inventes un precio, un modelo o una condición que no esté ahí.

Reglas:
- Si preguntan por un modelo que no está en el catálogo, decilo con honestidad y ofrecé avisarles cuando entre algo similar.
- Si el precio dice "Consultar", explicá que se coordina por WhatsApp según la pieza y no inventes un número.
- Sé cordial, breve y directo — estilo mensaje de WhatsApp, no un mail corporativo. Nada de párrafos largos.
- Nunca confirmes una venta ni tomes pagos: para cerrar la compra, derivá siempre a que un humano del equipo continúe la conversación.
- Si preguntan algo que no tiene que ver con el catálogo (reclamos, envíos ya hechos, consignación de su propia cartera), decí que en breve los contacta el equipo y no improvises una respuesta.

Catálogo actual:
${buildCatalogContext(products)}`;
}

export interface GenerateReplyOptions {
  apiKey: string;
  userMessage: string;
  history?: ChatMessage[];
  products?: Product[];
  model?: string;
}

/** Genera la respuesta del agente para un mensaje entrante de WhatsApp. */
export async function generateReply({
  apiKey,
  userMessage,
  history = [],
  products = STATIC_PRODUCTS,
  model = 'claude-sonnet-5',
}: GenerateReplyOptions): Promise<string> {
  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model,
    max_tokens: 400,
    system: buildSystemPrompt(products),
    messages: [...history, { role: 'user', content: userMessage }],
  });

  const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === 'text');
  return textBlock?.text?.trim() || 'Perdón, no pude procesar tu mensaje. En breve te contacta alguien del equipo.';
}

/** Valida el handshake de verificación del webhook (paso único al configurarlo en Meta). */
export function verifyWebhookChallenge(
  query: Record<string, string | string[] | undefined>,
  expectedToken: string,
): string | null {
  const mode = query['hub.mode'];
  const token = query['hub.verify_token'];
  const challenge = query['hub.challenge'];
  if (mode === 'subscribe' && token === expectedToken && typeof challenge === 'string') {
    return challenge;
  }
  return null;
}

/** Extrae el texto y el número del remitente del payload que manda Meta. */
export function extractIncomingMessage(
  body: unknown,
): { from: string; text: string } | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const change = (body as any)?.entry?.[0]?.changes?.[0]?.value;
    const message = change?.messages?.[0];
    if (!message || message.type !== 'text') return null;
    return { from: message.from as string, text: message.text.body as string };
  } catch {
    return null;
  }
}

/** Envía la respuesta generada de vuelta al usuario por WhatsApp Cloud API. */
export async function sendWhatsAppMessage(params: {
  to: string;
  text: string;
  token: string;
  phoneNumberId: string;
}): Promise<void> {
  const { to, text, token, phoneNumberId } = params;
  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      text: { body: text },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`WhatsApp API error (${res.status}): ${errText}`);
  }
}

export { WHATSAPP_PHONE };
