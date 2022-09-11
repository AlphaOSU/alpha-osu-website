import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

const minify = true;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(minify ? [legacy({ targets: ['defaults', 'not IE 11'] })]: []),
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify,
    outDir: 'dist',
  },
});
