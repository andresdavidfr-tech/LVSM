import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  buildCatalogContext,
  buildSystemPrompt,
  verifyWebhookChallenge,
  extractIncomingMessage,
  sendWhatsAppMessage,
} from './whatsappBot';
import { STATIC_PRODUCTS } from '../data/products';

describe('buildCatalogContext', () => {
  it('incluye marca, nombre y precio de cada producto del catálogo', () => {
    const context = buildCatalogContext();
    for (const p of STATIC_PRODUCTS) {
      expect(context).toContain(p.brand);
      expect(context).toContain(p.name);
    }
  });

  it('muestra "Consultar" para productos sin precio numérico', () => {
    const context = buildCatalogContext([
      { ...STATIC_PRODUCTS[0], priceNumber: null },
    ]);
    expect(context).toContain('Consultar');
  });

  it('muestra el precio formateado cuando existe', () => {
    const context = buildCatalogContext([
      { ...STATIC_PRODUCTS[0], priceNumber: 1500000 },
    ]);
    expect(context).toMatch(/\$1\.500\.000/);
  });
});

describe('buildSystemPrompt', () => {
  it('instruye a no inventar precios ni modelos', () => {
    const prompt = buildSystemPrompt();
    expect(prompt.toLowerCase()).toContain('nunca inventes');
  });

  it('instruye a derivar el cierre de venta a un humano', () => {
    const prompt = buildSystemPrompt();
    expect(prompt.toLowerCase()).toContain('nunca confirmes una venta');
  });

  it('incluye el catálogo actual', () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain(STATIC_PRODUCTS[0].brand);
  });
});

describe('verifyWebhookChallenge', () => {
  it('devuelve el challenge cuando el modo y el token coinciden', () => {
    const result = verifyWebhookChallenge(
      { 'hub.mode': 'subscribe', 'hub.verify_token': 'secreto', 'hub.challenge': 'abc123' },
      'secreto',
    );
    expect(result).toBe('abc123');
  });

  it('devuelve null si el token no coincide', () => {
    const result = verifyWebhookChallenge(
      { 'hub.mode': 'subscribe', 'hub.verify_token': 'incorrecto', 'hub.challenge': 'abc123' },
      'secreto',
    );
    expect(result).toBeNull();
  });

  it('devuelve null si falta el modo subscribe', () => {
    const result = verifyWebhookChallenge(
      { 'hub.verify_token': 'secreto', 'hub.challenge': 'abc123' },
      'secreto',
    );
    expect(result).toBeNull();
  });
});

describe('extractIncomingMessage', () => {
  it('extrae remitente y texto de un payload válido de Meta', () => {
    const body = {
      entry: [
        {
          changes: [
            {
              value: {
                messages: [{ from: '5491112345678', type: 'text', text: { body: 'Hola, tienen la Neverfull?' } }],
              },
            },
          ],
        },
      ],
    };
    expect(extractIncomingMessage(body)).toEqual({ from: '5491112345678', text: 'Hola, tienen la Neverfull?' });
  });

  it('devuelve null para mensajes que no son de texto (ej. imagen, status)', () => {
    const body = {
      entry: [{ changes: [{ value: { messages: [{ from: '54911', type: 'image' }] } }] }],
    };
    expect(extractIncomingMessage(body)).toBeNull();
  });

  it('devuelve null para un payload sin mensajes (ej. evento de status)', () => {
    const body = { entry: [{ changes: [{ value: { statuses: [{ status: 'delivered' }] } }] }] };
    expect(extractIncomingMessage(body)).toBeNull();
  });

  it('devuelve null para un payload malformado sin tirar excepción', () => {
    expect(extractIncomingMessage(null)).toBeNull();
    expect(extractIncomingMessage({})).toBeNull();
    expect(extractIncomingMessage('texto random')).toBeNull();
  });
});

describe('sendWhatsAppMessage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('llama a la Graph API de Meta con el payload correcto', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    await sendWhatsAppMessage({ to: '5491112345678', text: 'Hola!', token: 'tok', phoneNumberId: '123' });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://graph.facebook.com/v21.0/123/messages',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer tok' }),
      }),
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toEqual({ messaging_product: 'whatsapp', to: '5491112345678', text: { body: 'Hola!' } });
  });

  it('tira un error legible si la Graph API responde con error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 401, text: async () => 'Invalid token' }),
    );

    await expect(
      sendWhatsAppMessage({ to: '54911', text: 'Hola', token: 'bad', phoneNumberId: '123' }),
    ).rejects.toThrow(/401/);
  });
});
