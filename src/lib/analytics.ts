// Capa de analítica agnóstica del proveedor. Reenvía eventos a GA4 (gtag) y a
// Vercel Analytics (va) si están presentes; si no, no-op. En dev loguea para
// poder validar el funnel. Eventos clave del e-commerce: select_item,
// view_item, add_to_wishlist, contact_whatsapp, lead_submit, filter_use.
type Props = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    va?: (event: string, payload?: unknown) => void;
  }
}

export function track(event: string, props: Props = {}): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', event, props);
    window.va?.('event', { name: event, data: props });
  } catch {
    /* nunca romper la UI por analítica */
  }
  if (import.meta.env.DEV) console.debug('[track]', event, props);
}
