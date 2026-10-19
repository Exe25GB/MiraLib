import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Configura jsdom como entorno
    globals: true,        // Permite usar describe, it, expect sin importarlos cada vez
    setupFiles: './setupTests.js', // Archivo de configuración global que crearemos
  },
});