import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WishlistProvider } from '../hooks/useWishlist';

// Envuelve la UI con Router + WishlistProvider (lo que necesitan las páginas).
export function renderWithProviders(ui: ReactElement, { route = '/' }: { route?: string } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <WishlistProvider>{ui}</WishlistProvider>
    </MemoryRouter>,
  );
}
