import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';
import { getGoogleFormConfig } from '../../lib/googleFormSubmit';

describe('ContactForm', () => {
  it('renderiza el form con action y target hacia el iframe oculto', () => {
    const { container } = render(<ContactForm />);
    const form = container.querySelector('form')!;
    expect(form).toHaveAttribute('action', getGoogleFormConfig()!.action);
    expect(form).toHaveAttribute('target', 'lvsm_select_club_target');
    expect(container.querySelector('iframe[name="lvsm_select_club_target"]')).toBeInTheDocument();
  });

  it('manda los hidden inputs con los entry IDs correctos según lo tipeado', async () => {
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);
    const config = getGoogleFormConfig()!;

    await user.type(screen.getByPlaceholderText('Ej: María García'), 'María');
    await user.type(screen.getByPlaceholderText('maria@ejemplo.com'), 'maria@ejemplo.com');

    expect(container.querySelector(`input[name="${config.entryName}"]`)).toHaveValue('María');
    expect(container.querySelector(`input[name="${config.entryEmail}"]`)).toHaveValue('maria@ejemplo.com');
  });

  it('muestra el mensaje de éxito luego de que el iframe termina de cargar tras el submit', async () => {
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

  it('muestra las ventajas del club', () => {
    render(<ContactForm />);
    expect(screen.getByText('Acceso Anticipado')).toBeInTheDocument();
    expect(screen.getByText('Ventas Privadas')).toBeInTheDocument();
    expect(screen.getByText('Descuentos Exclusivos')).toBeInTheDocument();
  });
});
