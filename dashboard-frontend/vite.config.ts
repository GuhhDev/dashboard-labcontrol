import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Configuração para garantir que rotas diretas funcionem
  server: {
    host: true,
    port: 5173, // Porta padrão
    strictPort: false,
    open: true,
    // Configuração para lidar com o history mode
    historyApiFallback: true,
  },
  // Configuração para build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Melhora a experiência para Single-Page Applications
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          keycloak: ['keycloak-js', '@react-keycloak/web'],
        },
      },
    },
  },
});
