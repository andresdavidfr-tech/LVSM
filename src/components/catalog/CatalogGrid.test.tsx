import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import { CatalogGrid } from './CatalogGrid';

// fetch('/api/products') falla con URL relativa en el entorno de test, por lo
// que CatalogGrid cae a los datos estáticos: ideal para testear sin mocks.

describe('CatalogGrid', () => {
  it('lista todos los productos al cargar', async () => {
    renderWithProviders(<CatalogGrid />);
    expect(await screen.findByText('Neverfull MM Monogram')).toBeInTheDocument();
    expect(screen.getByText('Soho Disco Crossbody')).toBeInTheDocument();
    expect(screen.getByText('Hourglass Croc-Embossed Chain Bag')).toBeInTheDocument();
    expect(screen.getByText('Neverfull MM Damier Ebène')).toBeInTheDocument();
  });

  it('filtra por marca', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CatalogGrid />);
    await screen.findByText('Neverfull MM Monogram');

    await user.click(screen.getByRole('button', { name: 'Gucci' }));

    expect(screen.getByText('Soho Disco Crossbody')).toBeInTheDocument();
    expect(screen.queryByText('Neverfull MM Monogram')).not.toBeInTheDocument();
    expect(screen.queryByText('Hourglass Croc-Embossed Chain Bag')).not.toBeInTheDocument();
  });

  it('filtra por búsqueda de texto', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CatalogGrid />);
    await screen.findByText('Neverfull MM Monogram');

    await user.type(screen.getByPlaceholderText('Buscar...'), 'totally');

    expect(screen.getByText('Totally MM Monogram')).toBeInTheDocument();
    expect(screen.queryByText('Soho Disco Crossbody')).not.toBeInTheDocument();
  });

  it('muestra el estado vacío cuando no hay coincidencias', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CatalogGrid />);
    await screen.findByText('Neverfull MM Monogram');

    await user.type(screen.getByPlaceholderText('Buscar...'), 'zzzznoexiste');

    expect(await screen.findByText(/Avisame cuando entre/i)).toBeInTheDocument();
    expect(screen.queryByText('Neverfull MM Monogram')).not.toBeInTheDocument();
  });
});
