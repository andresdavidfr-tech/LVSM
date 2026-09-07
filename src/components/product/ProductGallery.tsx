import { useState } from 'react';
import { AlertCircle, ImageOff } from 'lucide-react';
import { SmartImage } from '../ui/SmartImage';
import { resolveImage, isPlaceholderImage } from '../../lib/images';
import type { ProductImage } from '../../data/products';

// Galería para artículos usados: imagen principal grande con detalle de los
// desgastes (transparencia) + miniaturas. Eleva confianza sin perder elegancia.
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  const placeholder = isPlaceholderImage(current);

  return (
    <div>
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 shadow-xl">
        <SmartImage
          src={resolveImage(current)}
          alt={current.alt}
          priority
          wrapperClassName="w-full h-full"
          className="w-full h-full object-cover"
        />
        {placeholder && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-amber-500/90 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
            <ImageOff size={11} /> Foto referencial
          </div>
        )}
        {/* El caption de condición/defecto solo se muestra sobre la foto real del
            artículo: mostrarlo sobre el placeholder afirmaría un desgaste
            puntual que esa foto genérica no puede respaldar. */}
        {!placeholder && current.isDefect && current.caption && (
          <div className="absolute bottom-0 inset-x-0 bg-black/65 text-white text-xs p-3 flex items-center gap-2">
            <AlertCircle size={14} className="flex-shrink-0" /> {current.caption}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ver ${img.alt}`}
            aria-current={i === active}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
              i === active ? 'border-brand-accent' : 'border-transparent hover:border-brand-gold'
            }`}
          >
            <SmartImage src={resolveImage(img)} alt={img.alt} wrapperClassName="w-full h-full" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
