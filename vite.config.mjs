import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  base: '/feco-shots/',
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: false
    }
  }
});
