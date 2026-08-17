import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 500,  // Reduced to 500ms for faster detection
      binaryInterval: 1000,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
    proxy: {
      '/api/golang': {
        target: 'http://api-golang:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/golang/, ''),
        secure: false,
      },
      '/api/node': {
        target: 'http://api-node:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/node/, ''),
        secure: false,
      },
    },
  },
});
