import { describe, it, expect } from 'vitest';
import { formatPrice } from './format';

describe('formatPrice', () => {
  it('devuelve "Consultar" cuando el precio es null', () => {
    expect(formatPrice(null)).toBe('Consultar');
  });

  it('formatea números con separador de miles (es-AR)', () => {
    expect(formatPrice(1500)).toMatch(/1\.500/);
  });

  it('no incluye decimales', () => {
    expect(formatPrice(1500)).not.toMatch(/[.,]00/);
  });
});
