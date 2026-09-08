# Agente de WhatsApp — guía de configuración

El código ya está listo (`api/whatsapp-webhook.ts` + `src/lib/whatsappBot.ts`).
Lo que falta es configurar la cuenta de Meta — eso es algo que tenés que
hacer vos, con tu identidad/documentación de negocio; no hay forma de
automatizarlo desde acá.

## 1. Crear la app en Meta for Developers

1. Entrá a https://developers.facebook.com/ y creá una cuenta de developer
   si no tenés.
2. "My Apps" → "Create App" → tipo **Business**.
3. Dentro de la app, agregá el producto **WhatsApp**.

## 2. Número de WhatsApp

Meta te da un número de prueba gratis para testear. Para producción vas a
necesitar:
- Verificar tu negocio en **Meta Business Manager** (sube documentación:
  CUIT, comprobante de domicilio del negocio, etc. — puede tardar unos días).
- Migrar o dar de alta el número real de LVSM como número de WhatsApp Business
  Platform (si ya lo usás con la app normal de WhatsApp Business, hay que
  migrarlo — Meta tiene un flujo para esto, pero **el número deja de andar
  en la app común** una vez migrado).

## 3. Datos que necesitás copiar a las variables de entorno

En el panel de WhatsApp de tu app en Meta for Developers vas a encontrar:

- **Token de acceso temporal** (dura 24hs, sirve para probar) o, para
  producción, generá un **token de acceso permanente** ligado a un
  System User de tu Business Manager → `WHATSAPP_TOKEN`
- **Phone Number ID** (NO es el número de teléfono, es un ID interno de
  Meta) → `WHATSAPP_PHONE_NUMBER_ID`
- Inventá vos cualquier string secreta → `WHATSAPP_VERIFY_TOKEN` (Meta te la
  va a pedir en el paso siguiente, tiene que coincidir con la que pongas acá)

## 4. Cargar las variables en Vercel

En el proyecto de Vercel: Settings → Environment Variables, cargá las 4
variables de la sección "Agente de WhatsApp" de `.env.example`, más
`ANTHROPIC_API_KEY` (la sacás de https://console.anthropic.com/settings/keys).
Volvé a desplegar el proyecto después de cargarlas.

## 5. Configurar el webhook en Meta

En el panel de WhatsApp de tu app → Configuration → Webhook:
- **Callback URL**: `https://lvsm.com.ar/api/whatsapp-webhook`
- **Verify Token**: el mismo valor que pusiste en `WHATSAPP_VERIFY_TOKEN`
- Suscribite al campo **messages**

Meta va a hacer un `GET` a esa URL para verificar que el webhook responde
correctamente antes de activarlo — si `WHATSAPP_VERIFY_TOKEN` está bien
cargado en Vercel, debería pasar solo.

## 6. Probar

Escribile al número de WhatsApp Business configurado. El agente va a
responder usando el catálogo actual de `src/data/products.ts` — no inventa
precios ni modelos que no estén ahí, y deriva a un humano para cualquier
cosa que no sea una pregunta de catálogo (cerrar la venta, reclamos, etc.).

## Limitaciones de esta primera versión

- **Sin memoria entre mensajes**: cada pregunta se responde de forma
  independiente, no recuerda lo que se habló antes en la misma conversación.
  Si hace falta, el siguiente paso natural es sumar una base de datos liviana
  (ej. Vercel KV) para guardar el historial por número de teléfono.
- **Ventana de 24hs de Meta**: WhatsApp solo permite responder libremente
  dentro de las 24hs desde el último mensaje del cliente. Pasado ese tiempo,
  hay que usar un "template" pre-aprobado por Meta para reabrir la
  conversación (no está implementado acá).
- El agente **nunca cierra una venta ni toma pagos** — está instruido para
  derivar siempre a una persona del equipo en ese punto.
