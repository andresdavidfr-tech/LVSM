import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// El setup corre en ambos entornos (jsdom y node), así que protegemos los
// accesos al DOM para que los tests de servidor (node) no fallen.
afterEach(() => {
  if (typeof document !== 'undefined') cleanup();
  if (typeof localStorage !== 'undefined') localStorage.clear();
});
