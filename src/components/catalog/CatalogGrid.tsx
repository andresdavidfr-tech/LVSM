import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, MessageCircle } from 'lucide-react';
import { fetchProducts, CONDITIONS, type Product } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { Skeleton } from '../ui/Skeleton';
import { wa } from '../../lib/whatsapp';
import { track } from '../../lib/analytics';

const ALL_BRANDS = 'Todos';
const ALL_CONDITIONS = 'Todas';

function EmptyState({ brand }: { brand: string }) {
  return (
    <div className="text-center py-20">
      <p className="text-brand-ink/60 font-light mb-6">
        No tenemos piezas {brand !== ALL_BRANDS ? `de ${brand} ` : ''}disponibles con esos filtros ahora mismo.
      </p>
      <a
        href={wa(`Hola! Estoy buscando una cartera${brand !== ALL_BRANDS ? ` ${brand}` : ''}. ¿Me avisan cuando entre algo?`)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('contact_whatsapp', { where: 'empty_state', brand })}
        className="inline-flex items-center gap-2 bg-brand-ink text-brand-paper px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-brand-accent transition-all"
      >
        Avisame cuando entre <MessageCircle size={14} />
      </a>
    </div>
  );
}

export function CatalogGrid() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [brand, setBrand] = useState<string>(ALL_BRANDS);
  const [condition, setCondition] = useState<string>(ALL_CONDITIONS);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const brands = useMemo(
    () => [ALL_BRANDS, ...Array.from(new Set((products ?? []).map((p) => p.brand)))],
    [products],
  );

  const visible = useMemo(
    () =>
      (products ?? []).filter(
        (p) =>
          (brand === ALL_BRANDS || p.brand === brand) &&
          (condition === ALL_CONDITIONS || p.condition === condition) &&
          `${p.brand} ${p.name} ${p.type}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [products, brand, condition, query],
  );

  return (
    <section id="catalog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Nuestra Colección</span>
          <h2 className="text-4xl sm:text-5xl font-serif">Piezas Seleccionadas</h2>
        </div>

        {/* Filtros funcionales: marca, estado y búsqueda */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => {
                  setBrand(b);
                  track('filter_use', { type: 'brand', value: b });
                }}
                aria-pressed={brand === b}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-colors border ${
                  brand === b ? 'bg-brand-ink text-brand-paper border-brand-ink' : 'border-brand-ink/10 hover:border-brand-ink'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            <select
              value={condition}
              onChange={(e) => {
                setCondition(e.target.value);
                track('filter_use', { type: 'condition', value: e.target.value });
              }}
              className="bg-brand-paper border border-brand-ink/10 rounded-full px-4 py-2.5 text-xs uppercase tracking-widest outline-none focus:border-brand-gold"
            >
              <option value={ALL_CONDITIONS}>Todo estado</option>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar..."
                className="pl-9 pr-4 py-2.5 bg-brand-paper border border-brand-ink/10 rounded-full text-sm outline-none focus:border-brand-gold w-44"
              />
            </div>
          </div>
        </div>

        {products === null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[3/4] mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <EmptyState brand={brand} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 3} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <a
            href="https://instagram.com/lv_sanmiguel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold border-b border-brand-ink pb-2 hover:text-brand-gold hover:border-brand-gold transition-all"
          >
            Ver colección completa en Instagram <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
