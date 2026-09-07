import { useState, type ImgHTMLAttributes } from 'react';

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;        // true para el LCP (Hero / imagen principal de PDP)
  wrapperClassName?: string;
}

// Imagen optimizada: lazy-loading por defecto, fetchPriority alto para el LCP,
// decoding async y fade-in con placeholder para evitar saltos de layout (CLS).
export function SmartImage({
  src,
  alt,
  priority = false,
  wrapperClassName = '',
  className = '',
  ...rest
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-brand-ink/5 ${wrapperClassName}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-brand-ink/10" aria-hidden />}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...rest}
      />
    </div>
  );
}
