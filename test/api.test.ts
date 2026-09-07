// @vitest-environment node
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import Database from 'better-sqlite3';
import { createApiApp } from '../api';

const makeApp = () => createApiApp(new Database(':memory:'));

describe('POST /api/leads', () => {
  it('crea un lead válido (201)', async () => {
    const res = await request(makeApp()).post('/api/leads').send({ name: 'Ana', email: 'ana@e.com' });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('rechaza si falta el email (400)', async () => {
    const res = await request(makeApp()).post('/api/leads').send({ name: 'Ana' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it('rechaza si falta el nombre (400)', async () => {
    const res = await request(makeApp()).post('/api/leads').send({ email: 'ana@e.com' });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/leads', () => {
  it('devuelve los leads insertados', async () => {
    const app = makeApp();
    await request(app).post('/api/leads').send({ name: 'Ana', email: 'ana@e.com' });
    await request(app).post('/api/leads').send({ name: 'Bea', email: 'bea@e.com' });

    const res = await request(app).get('/api/leads');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body.map((l: { name: string }) => l.name).sort()).toEqual(['Ana', 'Bea']);
  });
});

describe('GET /api/products', () => {
  it('devuelve el catálogo', async () => {
    const res = await request(makeApp()).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('slug');
  });
});

describe('GET /api/reviews', () => {
  it('devuelve las reseñas', async () => {
    const res = await request(makeApp()).get('/api/reviews');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
