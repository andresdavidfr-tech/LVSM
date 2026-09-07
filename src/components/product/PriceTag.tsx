import { formatPrice } from '../../lib/format';

export const PriceTag = ({ value, className = '' }: { value: number | null; className?: string }) => (
  <span className={className}>
    {value == null ? <span className="text-brand-accent">Consultar</span> : formatPrice(value)}
  </span>
);
