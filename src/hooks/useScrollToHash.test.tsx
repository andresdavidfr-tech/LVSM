import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useScrollToHash } from './useScrollToHash';

function TestHarness() {
  useScrollToHash();
  return (
    <div>
      <div id="contact">Sección de contacto</div>
    </div>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useScrollToHash', () => {
  it('hace scroll al elemento cuyo id coincide con el hash de la URL', async () => {
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    render(
      <MemoryRouter initialEntries={['/#contact']}>
        <TestHarness />
      </MemoryRouter>,
    );

    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('reintenta el scroll pasado un momento (por si el layout se corrió con imágenes cargando)', async () => {
    vi.useFakeTimers();
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    render(
      <MemoryRouter initialEntries={['/#contact']}>
        <TestHarness />
      </MemoryRouter>,
    );

    scrollIntoViewMock.mockClear(); // sacamos la llamada del primer intento (rAF)
    vi.advanceTimersByTime(700);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    vi.useRealTimers();
  });

  it('no hace nada si la URL no tiene hash', async () => {
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    render(
      <MemoryRouter initialEntries={['/']}>
        <TestHarness />
      </MemoryRouter>,
    );

    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });
});
