import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, MessageCircle, ShieldCheck } from 'lucide-react';
import type { Product } from '../../data/products';
import { SmartImage } from '../ui/SmartImage';
import { ConditionBadge } from './ConditionBadge';
import { PriceTag } from './PriceTag';
import { useWishlist } from '../../hooks/useWishlist';
import { waProduct } from '../../lib/whatsapp';
import { track } from '../../lib/analytics';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const to = `/producto/${product.slug}`;

  return (
    <motion.div whileHover={{ y: -8 }} className="group">
      <Link to={to} onClick={() => track('select_item', { id: product.id, name: product.name })} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white">
          <SmartImage
            src={product.images[0].src}
            alt={product.images[0].alt}
            priority={priority}
            wrapperClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.authVerified && (
            <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-white/85 backdrop-blur-sm text-emerald-700 text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
              <ShieldCheck size={11} /> Verificada
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product);
            }}
            aria-label={wished ? 'Quitar de wishlist' : 'Agregar a wishlist'}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              wished ? 'bg-brand-accent text-white' : 'bg-white/80 backdrop-blur-sm hover:bg-brand-gold hover:text-white'
            }`}
          >
            <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
          </button>
        </div>
      </Link>

      <p className="text-[10px] uppercase tracking-widest text-brand-accent mb-1">{product.brand}</p>
      <h3 className="text-lg font-serif mb-2">
        <Link to={to} className="hover:text-brand-gold transition-colors">
          {product.name}
        </Link>
      </h3>
      <div className="mb-3">
        <ConditionBadge condition={product.condition} grade={product.conditionGrade} />
      </div>
      <div className="flex justify-between items-center">
        <PriceTag value={product.priceNumber} className="font-medium" />
        <a
          href={waProduct(product)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('contact_whatsapp', { id: product.id, where: 'card' })}
          className="text-xs inline-flex items-center gap-1 text-brand-ink/70 hover:text-brand-accent transition-colors"
        >
          Consultar <MessageCircle size={14} />
        </a>
      </div>
    </motion.div>
  );
}
