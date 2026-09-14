import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

const REQUIRED_ENVS: Record<string, string> = {
  VITE_GOOGLE_FORM_ACTION: 'https://docs.google.com/forms/d/e/abc/formResponse',
  VITE_GOOGLE_FORM_ENTRY_NAME: 'entry.111',
  VITE_GOOGLE_FORM_ENTRY_EMAIL: 'entry.222',
  VITE_GOOGLE_FORM_ENTRY_PHONE: 'entry.333',
  VITE_GOOGLE_FORM_ENTRY_INTEREST: 'entry.444',
  VITE_GOOGLE_FORM_ENTRY_MESSAGE: 'entry.555',
};

function stubConfigured() {
  for (const [key, value] of Object.entries(REQUIRED_ENVS)) vi.stubEnv(key, value);
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('ContactForm', () => {
  it('muestra el aviso de "pendiente de configurar" cuando falta la config', () => {
    render(<ContactForm />);
    expect(screen.getByText(/pendiente de configurar/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Ej: María García')).not.toBeInTheDocument();
  });

  it('renderiza el form con action y target hacia el iframe oculto cuando está configurado', () => {
    stubConfigured();
    const { container } = render(<ContactForm />);
    const form = container.querySelector('form')!;
    expect(form).toHaveAttribute('action', REQUIRED_ENVS.VITE_GOOGLE_FORM_ACTION);
    expect(form).toHaveAttribute('target', 'lvsm_select_club_target');
    expect(container.querySelector('iframe[name="lvsm_select_club_target"]')).toBeInTheDocument();
  });

  it('manda los hidden inputs con los entry IDs correctos según lo tipeado', async () => {
    stubConfigured();
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    await user.type(screen.getByPlaceholderText('Ej: María García'), 'María');
    await user.type(screen.getByPlaceholderText('maria@ejemplo.com'), 'maria@ejemplo.com');

    expect(container.querySelector('input[name="entry.111"]')).toHaveValue('María');
    expect(container.querySelector('input[name="entry.222"]')).toHaveValue('maria@ejemplo.com');
  });

  it('muestra el mensaje de éxito luego de que el iframe termina de cargar tras el submit', async () => {
    stubConfigured();
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    await user.type(screen.getByPlaceholderText('Ej: María García'), 'María');
    await user.type(screen.getByPlaceholderText('maria@ejemplo.com'), 'maria@ejemplo.com');
    await user.click(screen.getByRole('button', { name: /Suscribirme/i }));

    const iframe = container.querySelector('iframe[name="lvsm_select_club_target"]')!;
    act(() => {
      iframe.dispatchEvent(new Event('load'));
    });

    expect(await screen.findByText('¡Gracias por sumarte!')).toBeInTheDocument();
  });

  it('muestra las ventajas del club independientemente del estado del form', () => {
    render(<ContactForm />);
    expect(screen.getByText('Acceso Anticipado')).toBeInTheDocument();
    expect(screen.getByText('Ventas Privadas')).toBeInTheDocument();
    expect(screen.getByText('Descuentos Exclusivos')).toBeInTheDocument();
  });
});
