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

    const scrollToTarget = () => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Primer intento apenas se pinta el layout de este render...
    const raf = requestAnimationFrame(scrollToTarget);
    // ...y un reintento más tarde, por si imágenes de secciones más arriba
    // (Hero, catálogo, etc.) todavía no habían terminado de cargar y
    // corrieron la altura de la página, dejando el primer scroll corto.
    const timeout = setTimeout(scrollToTarget, 700);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [hash]);
}
