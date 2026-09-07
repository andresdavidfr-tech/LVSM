import { afterEach, describe, it, expect, vi } from 'vitest';
import { resolveImage, storageUrl, isStorageConfigured } from './images';

afterEach(() => vi.unstubAllEnvs());

describe('resolveImage (sin S3 configurado)', () => {
  it('devuelve la src de fallback aunque haya storageKey', () => {
    expect(resolveImage({ src: 'https://x/y.jpg', storageKey: 'catalogo/a/1.jpg' })).toBe('https://x/y.jpg');
    expect(isStorageConfigured()).toBe(false);
  });
});

describe('con S3 configurado', () => {
  it('arma la URL pública de S3 a partir del bucket y la región', () => {
    vi.stubEnv('VITE_S3_BUCKET', 'lvsm-847008501986-us-east-1-an');
    vi.stubEnv('VITE_S3_REGION', 'us-east-1');

    expect(isStorageConfigured()).toBe(true);
    expect(storageUrl('catalogo/a/1.jpg')).toBe(
      'https://lvsm-847008501986-us-east-1-an.s3.us-east-1.amazonaws.com/catalogo/a/1.jpg',
    );
    expect(resolveImage({ src: 'https://fallback/y.jpg', storageKey: 'catalogo/a/1.jpg' })).toBe(
      'https://lvsm-847008501986-us-east-1-an.s3.us-east-1.amazonaws.com/catalogo/a/1.jpg',
    );
  });

  it('sin storageKey usa la src aunque S3 esté configurado', () => {
    vi.stubEnv('VITE_S3_BUCKET', 'mi-bucket');
    expect(resolveImage({ src: 'https://x/y.jpg' })).toBe('https://x/y.jpg');
  });

  it('VITE_IMAGE_BASE_URL (CloudFront) tiene prioridad sobre S3', () => {
    vi.stubEnv('VITE_S3_BUCKET', 'mi-bucket');
    vi.stubEnv('VITE_IMAGE_BASE_URL', 'https://cdn.tudominio.com/');
    expect(storageUrl('catalogo/a/1.jpg')).toBe('https://cdn.tudominio.com/catalogo/a/1.jpg');
  });
});
