import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { WishlistProvider, useWishlist } from './useWishlist';
import { STATIC_PRODUCTS } from '../data/products';

const product = STATIC_PRODUCTS[0];
const wrapper = ({ children }: { children: React.ReactNode }) => <WishlistProvider>{children}</WishlistProvider>;

describe('useWishlist', () => {
  it('arranca vacío', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.count).toBe(0);
  });

  it('agrega y quita con toggle (dedupe por id)', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });

    act(() => result.current.toggle(product));
    expect(result.current.count).toBe(1);
    expect(result.current.has(product.id)).toBe(true);

    // agregar el mismo dos veces no duplica
    act(() => result.current.toggle(product));
    expect(result.current.count).toBe(0);
    expect(result.current.has(product.id)).toBe(false);
  });

  it('persiste en localStorage', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => result.current.toggle(product));
    expect(localStorage.getItem('lvsm_wishlist')).toContain(product.id);
  });

  it('se recupera de un localStorage corrupto sin romper', () => {
    localStorage.setItem('lvsm_wishlist', '{json roto');
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.count).toBe(0);
    expect(localStorage.getItem('lvsm_wishlist')).not.toBe('{json roto');
  });
});
