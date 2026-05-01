import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    // Proxy: redirige /api/* → http://localhost:3000/api/*
    // Útil para evitar errores CORS en desarrollo
    proxy: {
      '/api': {
        target     : 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
