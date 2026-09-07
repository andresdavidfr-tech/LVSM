// Reseñas verificadas. Hoy estáticas; el servidor expone /api/reviews con estos
// mismos datos para migrar a una fuente real sin tocar el frontend.

export interface Review {
  id: string;
  name: string;
  text: string;
  date: string;
  rating: number;     // 1..5
  verified: boolean;
}

export const STATIC_REVIEWS: Review[] = [
  { id: '1', name: 'Sofía R.', text: 'Increíble experiencia. La cartera está impecable, parece nueva. La atención de Florencia fue de 10.', date: 'Hace 2 días', rating: 5, verified: true },
  { id: '2', name: 'Valentina M.', text: 'Compré mi primera Louis Vuitton aquí y no puedo estar más feliz. Autenticidad total.', date: 'Hace 1 semana', rating: 5, verified: true },
  { id: '3', name: 'Lucía P.', text: 'Vendí mi cartera en consignación y fue súper rápido y profesional. Muy recomendadas.', date: 'Hace 2 semanas', rating: 5, verified: true },
];

export async function fetchReviews(): Promise<Review[]> {
  try {
    const res = await fetch('/api/reviews');
    if (res.ok) return (await res.json()) as Review[];
  } catch {
    /* fallback */
  }
  return STATIC_REVIEWS;
}
