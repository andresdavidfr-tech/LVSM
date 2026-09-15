import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// En una SPA, si entrás directo a una URL con #hash (ej. lvsm.com.ar/#contact
// tipeado en el navegador, o un link externo), el navegador intenta saltar a
// ese elemento ANTES de que React termine de renderizar la página — en ese
// momento el elemento todavía no existe en el DOM, así que el salto nativo
// no hace nada y la página se queda arriba de todo.
//
// Este hook reintenta el scroll una vez montado el árbol (con
// scroll-mt-* ya aplicado en cada sección para compensar el navbar fijo).
export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // requestAnimationFrame: esperamos a que el navegador termine de pintar
    // el layout de este render antes de medir la posición del elemento.
    const raf = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(raf);
  }, [hash]);
}
