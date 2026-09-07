import type { Condition } from '../../data/products';

const dotColor = (grade: number) =>
  grade >= 9 ? 'bg-emerald-500' : grade >= 8 ? 'bg-emerald-400' : grade >= 7 ? 'bg-amber-400' : 'bg-amber-500';

// Comunica el estado del artículo usado de forma clara y consistente: clave
// para reducir la ansiedad del comprador de segunda mano.
export const ConditionBadge = ({ condition, grade }: { condition: Condition; grade: number }) => (
  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
    <span className={`w-2 h-2 rounded-full ${dotColor(grade)}`} />
    {condition} · {grade}/10
  </span>
);
