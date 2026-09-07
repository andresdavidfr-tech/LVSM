import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

afterEach(() => vi.unstubAllGlobals());

async function fillAndSubmit() {
  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText('Ej: María García'), 'María');
  await user.type(screen.getByPlaceholderText('maria@ejemplo.com'), 'maria@ejemplo.com');
  await user.click(screen.getByRole('button', { name: /Enviar Información/i }));
}

describe('ContactForm', () => {
  it('muestra el mensaje de éxito y postea a /api/leads', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    render(<ContactForm />);
    await fillAndSubmit();

    expect(await screen.findByText('¡Gracias por sumarte!')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/leads', expect.objectContaining({ method: 'POST' }));
  });

  it('muestra error cuando la respuesta no es ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    render(<ContactForm />);
    await fillAndSubmit();

    expect(await screen.findByText(/Hubo un error/i)).toBeInTheDocument();
  });

  it('muestra error cuando fetch rechaza (red caída)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));

    render(<ContactForm />);
    await fillAndSubmit();

    expect(await screen.findByText(/Hubo un error/i)).toBeInTheDocument();
  });
});
