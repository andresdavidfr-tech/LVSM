import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import { ProductCard } from './ProductCard';
import { STATIC_PRODUCTS } from '../../data/products';

const product = STATIC_PRODUCTS[0];

describe('ProductCard', () => {
  it('renderiza marca, nombre y enlaza a la PDP', () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    expect(links.some((a) => a.getAttribute('href') === `/producto/${product.slug}`)).toBe(true);
  });

  it('alterna la wishlist al hacer click en el corazón', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductCard product={product} />);

    await user.click(screen.getByLabelText('Agregar a wishlist'));
    expect(screen.getByLabelText('Quitar de wishlist')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Quitar de wishlist'));
    expect(screen.getByLabelText('Agregar a wishlist')).toBeInTheDocument();
  });
});
