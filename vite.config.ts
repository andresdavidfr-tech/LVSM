import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Compatibilidad con navegadores viejos (Chrome corporativo/gubernamental
      // que muchas veces queda congelado en versiones desactualizadas por
      // política de IT): sin esto, el bundle moderno (ES modules nativos) no
      // se ejecuta y la página queda en blanco. Este plugin genera un segundo
      // bundle en ES5 + polyfills que esos navegadores sí pueden correr; los
      // navegadores modernos ni lo descargan.
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
