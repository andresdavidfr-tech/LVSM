import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from '../../hooks/useWishlist';
import { ProductDetail } from './ProductDetail';
import { STATIC_PRODUCTS } from '../../data/products';

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <WishlistProvider>
        <Routes>
          <Route path="/producto/:slug" element={<ProductDetail />} />
        </Routes>
      </WishlistProvider>
    </MemoryRouter>,
  );
}

describe('ProductDetail (PDP)', () => {
  it('muestra la ficha completa del producto', async () => {
    const p = STATIC_PRODUCTS[0];
    renderAt(`/producto/${p.slug}`);

    expect(await screen.findByRole('heading', { name: p.name })).toBeInTheDocument();
    expect(screen.getByText(p.measurements)).toBeInTheDocument();
    expect(screen.getByText(p.material)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Consultar por WhatsApp/i })).toBeInTheDocument();
  });

  it('permite guardar la pieza en la wishlist', async () => {
    const p = STATIC_PRODUCTS[1];
    const user = userEvent.setup();
    renderAt(`/producto/${p.slug}`);
    await screen.findByRole('heading', { name: p.name });

    await user.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(screen.getByRole('button', { name: 'Guardada' })).toBeInTheDocument();
  });

  it('muestra el estado "no encontrada" para un slug inexistente', async () => {
    renderAt('/producto/no-existe');
    expect(await screen.findByText('Pieza no encontrada')).toBeInTheDocument();
  });
});
