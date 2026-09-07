import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, MessageCircle, Ruler, Package, Tag } from 'lucide-react';
import { fetchProduct, type Product } from '../../data/products';
import { ProductGallery } from '../product/ProductGallery';
import { ConditionBadge } from '../product/ConditionBadge';
import { PriceTag } from '../product/PriceTag';
import { AuthenticityBadge, GuaranteeStrip } from '../trust/Trust';
import { Skeleton } from '../ui/Skeleton';
import { useWishlist } from '../../hooks/useWishlist';
import { waProduct } from '../../lib/whatsapp';
import { track } from '../../lib/analytics';

// Barra de compra fija en mobile: el CTA siempre visible reduce el abandono.
function StickyBuyBar({ product }: { product: Product }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-brand-paper/95 backdrop-blur border-t border-brand-ink/10 p-4 flex items-center justify-between gap-4 md:hidden">
      <div>
        <p className="text-[10px] uppercase tracking-widest opacity-50">{product.brand}</p>
        <PriceTag value={product.priceNumber} className="font-medium" />
      </div>
      <a
        href={waProduct(product)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('contact_whatsapp', { id: product.id, where: 'sticky' })}
        className="flex-1 max-w-[60%] bg-brand-ink text-brand-paper py-3 rounded-full text-xs uppercase tracking-widest text-center inline-flex items-center justify-center gap-2"
      >
        Consultar <MessageCircle size={16} />
      </a>
    </div>
  );
}

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  // null = cargando, undefined = no encontrado
  const [product, setProduct] = useState<Product | null | undefined>(null);
  const { has, toggle } = useWishlist();

  useEffect(() => {
    let alive = true;
    window.scrollTo(0, 0);
    setProduct(null);
    fetchProduct(slug ?? '').then((p) => {
      if (!alive) return;
      setProduct(p ?? undefined);
      if (p) track('view_item', { id: p.id, name: p.name });
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (product === null) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid md:grid-cols-2 gap-12">
        <Skeleton className="aspect-[4/5]" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (product === undefined) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-40 text-center">
        <h1 className="text-4xl font-serif mb-4">Pieza no encontrada</h1>
        <p className="text-brand-ink/60 mb-8">Puede que ya se haya vendido. Escribinos y te buscamos algo similar.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold border-b border-brand-ink pb-1">
          <ArrowLeft size={14} /> Volver al catálogo
        </Link>
      </div>
    );
  }

  const wished = has(product.id);

  return (
    <div className="pt-28 pb-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/#catalog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-ink/60 hover:text-brand-ink mb-8"
        >
          <ArrowLeft size={14} /> Volver al catálogo
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ProductGallery images={product.images} />

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-2">{product.brand}</p>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <ConditionBadge condition={product.condition} grade={product.conditionGrade} />
              <AuthenticityBadge verified={product.authVerified} />
            </div>

            <PriceTag value={product.priceNumber} className="text-2xl font-serif block mb-8" />

            <p className="text-brand-ink/70 font-light leading-relaxed mb-8">{product.description}</p>

            {/* Ficha técnica: elimina dudas pre-compra */}
            <dl className="space-y-4 mb-8 border-t border-brand-ink/10 pt-8">
              <div className="flex gap-4 text-sm">
                <dt className="flex items-center gap-2 w-40 text-brand-ink/50 uppercase tracking-widest text-[10px] font-bold">
                  <Tag size={14} /> Material
                </dt>
                <dd className="flex-1">{product.material}</dd>
              </div>
              <div className="flex gap-4 text-sm">
                <dt className="flex items-center gap-2 w-40 text-brand-ink/50 uppercase tracking-widest text-[10px] font-bold">
                  <Ruler size={14} /> Medidas
                </dt>
                <dd className="flex-1">{product.measurements}</dd>
              </div>
              <div className="flex gap-4 text-sm">
                <dt className="flex items-center gap-2 w-40 text-brand-ink/50 uppercase tracking-widest text-[10px] font-bold">
                  <Package size={14} /> Incluye
                </dt>
                <dd className="flex-1">{product.includes.join(' · ')}</dd>
              </div>
            </dl>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href={waProduct(product)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('contact_whatsapp', { id: product.id, where: 'pdp' })}
                className="flex-1 bg-brand-ink text-brand-paper px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-brand-accent transition-all inline-flex items-center justify-center gap-3"
              >
                Consultar por WhatsApp <MessageCircle size={18} />
              </a>
              <button
                onClick={() => toggle(product)}
                aria-pressed={wished}
                className={`px-8 py-4 rounded-full text-sm uppercase tracking-widest border transition-all inline-flex items-center justify-center gap-2 ${
                  wished ? 'bg-brand-accent text-white border-brand-accent' : 'border-brand-ink hover:bg-brand-ink hover:text-brand-paper'
                }`}
              >
                <Heart size={16} fill={wished ? 'currentColor' : 'none'} /> {wished ? 'Guardada' : 'Guardar'}
              </button>
            </div>

            <GuaranteeStrip className="border-t border-brand-ink/10 pt-6" />
          </motion.div>
        </div>
      </div>

      <StickyBuyBar product={product} />
    </div>
  );
}
