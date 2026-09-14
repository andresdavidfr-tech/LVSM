import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactForm } from './ContactForm';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('ContactForm', () => {
  it('muestra el aviso de "pendiente de configurar" cuando falta la URL del form', () => {
    vi.stubEnv('VITE_GOOGLE_FORM_EMBED_URL', '');
    render(<ContactForm />);
    expect(screen.getByText(/pendiente de configurar/i)).toBeInTheDocument();
    expect(screen.queryByTitle('Unite a nuestro Select Club')).not.toBeInTheDocument();
  });

  it('embebe el Google Form cuando la URL está configurada', () => {
    vi.stubEnv('VITE_GOOGLE_FORM_EMBED_URL', 'https://docs.google.com/forms/d/e/abc123/viewform?embedded=true');
    render(<ContactForm />);
    const iframe = screen.getByTitle('Unite a nuestro Select Club');
    expect(iframe).toHaveAttribute('src', 'https://docs.google.com/forms/d/e/abc123/viewform?embedded=true');
  });

  it('muestra las ventajas del club independientemente del estado del form', () => {
    vi.stubEnv('VITE_GOOGLE_FORM_EMBED_URL', '');
    render(<ContactForm />);
    expect(screen.getByText('Acceso Anticipado')).toBeInTheDocument();
    expect(screen.getByText('Ventas Privadas')).toBeInTheDocument();
    expect(screen.getByText('Descuentos Exclusivos')).toBeInTheDocument();
  });
});
