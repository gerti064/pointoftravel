import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost',  // Your PHP server address
        changeOrigin: true,
        secure: false,
        // This is important - it tells Vite where your PHP files actually are
        rewrite: (path) => path.replace(/^\/api/, '/pointoftravel/public/api')
      }
    }
  }
});
