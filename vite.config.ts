import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all /api requests to your PHP server (XAMPP)
      '/api': {
        target: 'http://localhost/pointoftravel',
        changeOrigin: true,
        secure: false,
        // Keep the same path: /api/... → http://localhost/pointoftravel/api/...
        // No rewrite needed since public/ is your docroot
      }
    }
  }
});
