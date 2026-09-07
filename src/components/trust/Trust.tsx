import { ShieldCheck, RotateCcw, Truck, Lock, Star, BadgeCheck } from 'lucide-react';
import type { Review } from '../../data/reviews';

// Insignia de autenticidad por pieza.
export const AuthenticityBadge = ({ verified }: { verified: boolean }) =>
  verified ? (
    <span className="inline-flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
      <ShieldCheck size={14} /> Autenticidad verificada
    </span>
  ) : null;

// Tira de garantías para mitigar la ansiedad del comprador cerca del CTA.
const guarantees = [
  { icon: ShieldCheck, label: 'Autenticidad garantizada' },
  { icon: RotateCcw, label: 'Devolución 48 h' },
  { icon: Truck, label: 'Envío asegurado' },
  { icon: Lock, label: 'Pago seguro' },
];

export const GuaranteeStrip = ({ className = '', dark = false }: { className?: string; dark?: boolean }) => (
  <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${className}`}>
    {guarantees.map(({ icon: Icon, label }) => (
      <div key={label} className={`flex items-center gap-2 text-xs ${dark ? 'text-white/80' : 'text-brand-ink/70'}`}>
        <Icon size={16} className="text-brand-gold flex-shrink-0" />
        {label}
      </div>
    ))}
  </div>
);

export const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-ink/5 flex flex-col justify-between">
    <div>
      <div className="flex gap-1 mb-4 text-brand-gold">
        {Array.from({ length: review.rating }).map((_, j) => (
          <Star key={j} size={12} fill="currentColor" />
        ))}
      </div>
      <p className="text-brand-ink/70 italic font-serif mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-brand-ink/5">
      <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1">
        {review.name}
        {review.verified && <BadgeCheck size={13} className="text-emerald-500" />}
      </span>
      <span className="text-xs uppercase tracking-widest opacity-40">{review.date}</span>
    </div>
  </div>
);
