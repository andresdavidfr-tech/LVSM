import { describe, it, expect } from 'vitest';
import { wa, waProduct, WHATSAPP_PHONE } from './whatsapp';

describe('wa', () => {
  it('arma una URL de wa.me con el número y el texto codificado', () => {
    const url = wa('hola mundo');
    expect(url).toBe(`https://wa.me/${WHATSAPP_PHONE}?text=hola%20mundo`);
  });
});

describe('waProduct', () => {
  const product = { brand: 'Gucci', name: 'GG Marmont', condition: 'Como nueva' };

  it('apunta al número de WhatsApp de LVSM', () => {
    expect(waProduct(product)).toContain(`wa.me/${WHATSAPP_PHONE}`);
  });

  it('incluye marca, modelo y estado en el mensaje', () => {
    const decoded = decodeURIComponent(waProduct(product));
    expect(decoded).toContain('Gucci');
    expect(decoded).toContain('GG Marmont');
    expect(decoded).toContain('Como nueva');
  });
});
