export const formatPrice = (n: number | null): string =>
  n == null
    ? 'Consultar'
    : new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(n);
