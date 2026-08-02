import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-app-assets',
      configureServer(server) {
        server.middlewares.use('/app', (req, res, next) => {
          try {
            const rawUrl = req.url.split('?')[0];
            const cleanUrl = decodeURIComponent(rawUrl);
            const filePath = path.join(__dirname, 'app', cleanUrl);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeTypes = {
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.gif': 'image/gif',
                '.css': 'text/css',
                '.js': 'text/javascript'
              };
              if (mimeTypes[ext]) {
                res.setHeader('Content-Type', mimeTypes[ext]);
              }
              return res.end(fs.readFileSync(filePath));
            }
          } catch (err) {
            console.error('Asset serve error:', err);
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  }
});
