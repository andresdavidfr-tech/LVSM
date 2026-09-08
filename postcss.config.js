// Tailwind CSS v4 genera colores con oklch() y color-mix(), que Chrome recién
// soporta desde la versión 111 (marzo 2023). En Chrome más viejo (común en
// Android que no se actualiza solo) esos colores no se pintan: botones,
// fondos y textos quedan invisibles. Estos plugins agregan un fallback en RGB
// que sí entienden los navegadores viejos, sin tocar nada del código de
// Tailwind ni de los componentes.
import colorMixFunction from '@csstools/postcss-color-mix-function';
import oklabFunction from '@csstools/postcss-oklab-function';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    colorMixFunction(),
    oklabFunction({ preserve: false }),
    autoprefixer(),
  ],
};
