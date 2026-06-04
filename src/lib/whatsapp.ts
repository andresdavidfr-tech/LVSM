// Canal de conversión principal de LVSM (venta personalizada por WhatsApp).
export const WHATSAPP_PHONE = '5491134041112';

export const wa = (text: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;

// Mensaje pre-cargado con contexto del producto (marca, modelo y estado) para
// reducir fricción y darle a la vendedora todo lo necesario para cerrar.
export const waProduct = (p: { brand: string; name: string; condition: string }) =>
  wa(`Hola! Me interesa la ${p.brand} ${p.name} (estado: ${p.condition}). ¿Sigue disponible y cómo continúo la compra?`);
