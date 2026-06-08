import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { SmartImage } from './ui/SmartImage';
import { PriceTag } from './product/PriceTag';
import { waProduct } from '../lib/whatsapp';
import { resolveImage } from '../lib/images';
import { track } from '../lib/analytics';

export function WishlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, toggle } = useWishlist();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-brand-paper rounded-[40px] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-brand-ink/5 flex justify-between items-center">
              <h2 className="text-3xl font-serif">Mi Wishlist</h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors" aria-label="Cerrar">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-brand-ink/60 font-light">Tu wishlist está vacía. ¡Explorá nuestro catálogo!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((product) => (
                    <div key={product.id} className="flex items-center gap-6 group">
                      <Link to={`/producto/${product.slug}`} onClick={onClose} className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <SmartImage src={resolveImage(product.images[0])} alt={product.images[0].alt} wrapperClassName="w-full h-full" className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-grow">
                        <p className="text-[10px] uppercase tracking-widest text-brand-accent">{product.brand}</p>
                        <Link to={`/producto/${product.slug}`} onClick={onClose} className="text-lg font-serif hover:text-brand-gold transition-colors">
                          {product.name}
                        </Link>
                        <PriceTag value={product.priceNumber} className="block text-sm font-light opacity-60" />
                      </div>
                      <div className="flex items-center gap-4">
                        <a
                          href={waProduct(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track('contact_whatsapp', { id: product.id, where: 'wishlist' })}
                          className="text-xs uppercase tracking-widest font-bold border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors"
                        >
                          Consultar
                        </a>
                        <button onClick={() => toggle(product)} className="p-2 text-brand-accent hover:bg-brand-accent/10 rounded-full transition-colors" aria-label="Quitar">
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 bg-brand-ink text-brand-paper">
              <button onClick={onClose} className="w-full py-4 rounded-full text-xs uppercase tracking-widest border border-brand-paper/20 hover:bg-brand-paper hover:text-brand-ink transition-all">
                Continuar Explorando
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
