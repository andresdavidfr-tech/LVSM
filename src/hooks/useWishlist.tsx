import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '../data/products';
import { track } from '../lib/analytics';

interface WishlistContextValue {
  items: Product[];
  toggle: (product: Product) => void;
  has: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = 'lvsm_wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Wishlist corrupta en localStorage, se reinicia', e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggle = (product: Product) =>
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      track(exists ? 'remove_from_wishlist' : 'add_to_wishlist', { id: product.id, name: product.name });
      return exists ? prev.filter((i) => i.id !== product.id) : [...prev, product];
    });

  const has = (id: string) => items.some((i) => i.id === id);

  return (
    <WishlistContext.Provider value={{ items, toggle, has, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist debe usarse dentro de <WishlistProvider>');
  return ctx;
}
