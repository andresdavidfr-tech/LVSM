export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-brand-ink/5 rounded-2xl ${className}`} aria-hidden />
);
