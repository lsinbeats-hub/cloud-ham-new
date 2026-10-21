import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, Plugin } from 'vite';

function saveCustomImagesPlugin(): Plugin {
  return {
    name: 'save-custom-images',
    configureServer(server) {
      server.middlewares.use('/api/save-custom-images', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        req.on('end', () => {
          try {
            const rawBody = Buffer.concat(chunks).toString('utf-8');
            const payload = JSON.parse(rawBody);
            const imagesMap = payload.images || payload;

            const rootDir = fileURLToPath(new URL('.', import.meta.url));
            const publicImagesDir = path.join(rootDir, 'public', 'images');
            const distImagesDir = path.join(rootDir, 'dist', 'images');
            const jsonPath = path.join(rootDir, 'src', 'data', 'showcaseImages.json');

            if (!fs.existsSync(publicImagesDir)) {
              fs.mkdirSync(publicImagesDir, { recursive: true });
            }
            if (fs.existsSync(distImagesDir)) {
              fs.mkdirSync(distImagesDir, { recursive: true });
            }

            let currentConfig: Record<string, string> = {};
            if (fs.existsSync(jsonPath)) {
              try {
                currentConfig = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
              } catch {
                currentConfig = {};
              }
            }

            const updated: Record<string, string> = { ...currentConfig };

            for (const [key, val] of Object.entries(imagesMap)) {
              if (typeof val !== 'string' || !val) continue;

              if (val.startsWith('data:image/')) {
                const match = val.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
                if (match) {
                  const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
                  const base64Data = match[2];
                  const fileName = `custom_layer_${key}_${Date.now()}.${ext}`;
                  const filePath = path.join(publicImagesDir, fileName);

                  fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

                  if (fs.existsSync(distImagesDir)) {
                    fs.writeFileSync(path.join(distImagesDir, fileName), Buffer.from(base64Data, 'base64'));
                  }

                  updated[key] = `/images/${fileName}`;
                }
              } else if (val.startsWith('/') || val.startsWith('http')) {
                updated[key] = val;
              }
            }

            fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), 'utf-8');

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, images: updated }));
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: errorMessage }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), saveCustomImagesPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
