// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import Database from 'better-sqlite3';
import { createApiApp } from '../api';
import { isValidKey } from '../s3';

const app = () => createApiApp(new Database(':memory:'));

describe('isValidKey', () => {
  it('acepta keys válidos del catálogo', () => {
    expect(isValidKey('catalogo/chanel-classic-flap-bag/1.jpg')).toBe(true);
    expect(isValidKey('catalogo/gucci-gg-marmont-small-shoulder/detalle.webp')).toBe(true);
  });

  it('rechaza path traversal, prefijos y extensiones inválidas', () => {
    expect(isValidKey('catalogo/../secret.jpg')).toBe(false);
    expect(isValidKey('otros/x/1.jpg')).toBe(false);
    expect(isValidKey('catalogo/x/script.js')).toBe(false);
    expect(isValidKey(123)).toBe(false);
  });
});

describe('POST /api/uploads/presign', () => {
  it('400 si faltan key o contentType', async () => {
    const res = await request(app()).post('/api/uploads/presign').send({});
    expect(res.status).toBe(400);
  });

  it('400 si el key es inválido', async () => {
    const res = await request(app())
      .post('/api/uploads/presign')
      .send({ key: '../x.jpg', contentType: 'image/jpeg' });
    expect(res.status).toBe(400);
  });

  it('400 si el tipo de archivo no está permitido', async () => {
    const res = await request(app())
      .post('/api/uploads/presign')
      .send({ key: 'catalogo/x/1.jpg', contentType: 'application/pdf' });
    expect(res.status).toBe(400);
  });

  it('503 si S3 no está configurado en el servidor', async () => {
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.AWS_SECRET_ACCESS_KEY;
    const res = await request(app())
      .post('/api/uploads/presign')
      .send({ key: 'catalogo/x/1.jpg', contentType: 'image/jpeg' });
    expect(res.status).toBe(503);
  });

  describe('con credenciales (firmado offline)', () => {
    beforeEach(() => {
      process.env.AWS_ACCESS_KEY_ID = 'AKIATEST';
      process.env.AWS_SECRET_ACCESS_KEY = 'secret';
      process.env.S3_BUCKET = 'lvsm-847008501986-us-east-1-an';
      process.env.AWS_REGION = 'us-east-1';
    });
    afterEach(() => {
      delete process.env.AWS_ACCESS_KEY_ID;
      delete process.env.AWS_SECRET_ACCESS_KEY;
      delete process.env.S3_BUCKET;
      delete process.env.AWS_REGION;
    });

    it('200 con URL firmada + URL pública', async () => {
      const res = await request(app())
        .post('/api/uploads/presign')
        .send({ key: 'catalogo/chanel-classic-flap-bag/1.jpg', contentType: 'image/jpeg' });

      expect(res.status).toBe(200);
      expect(res.body.url).toContain('X-Amz-Signature');
      expect(res.body.publicUrl).toBe(
        'https://lvsm-847008501986-us-east-1-an.s3.us-east-1.amazonaws.com/catalogo/chanel-classic-flap-bag/1.jpg',
      );
    });
  });
});
