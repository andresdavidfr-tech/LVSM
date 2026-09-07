import { describe, it, expect } from 'vitest';
import { STATIC_PRODUCTS, CONDITIONS, fetchProduct } from './products';

describe('STATIC_PRODUCTS (integridad del catálogo)', () => {
  it('tiene productos', () => {
    expect(STATIC_PRODUCTS.length).toBeGreaterThan(0);
  });

  it('los ids son únicos', () => {
    const ids = STATIC_PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('los slugs son únicos y no vacíos', () => {
    const slugs = STATIC_PRODUCTS.map((p) => p.slug);
    expect(slugs.every((s) => s.length > 0)).toBe(true);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('cada producto cumple el contrato mínimo', () => {
    for (const p of STATIC_PRODUCTS) {
      expect(p.name).toBeTruthy();
      expect(p.brand).toBeTruthy();
      expect(p.images.length).toBeGreaterThan(0);
      expect(p.images[0].src).toMatch(/^https?:\/\//);
      expect(CONDITIONS).toContain(p.condition);
      expect(p.conditionGrade).toBeGreaterThanOrEqual(1);
      expect(p.conditionGrade).toBeLessThanOrEqual(10);
    }
  });
});

describe('fetchProduct (con fallback a datos estáticos)', () => {
  it('encuentra un producto por slug', async () => {
    const slug = STATIC_PRODUCTS[0].slug;
    const product = await fetchProduct(slug);
    expect(product?.slug).toBe(slug);
  });

  it('devuelve undefined para un slug inexistente', async () => {
    expect(await fetchProduct('no-existe')).toBeUndefined();
  });
});
