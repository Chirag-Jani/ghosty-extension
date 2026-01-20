import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup.html'),
        background: resolve(__dirname, 'src/scripts/background.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'popup' ? 'popup.js' : `${chunkInfo.name}.js`;
        },
      },
    },
  },
  publicDir: 'public',
  plugins: [
    react(),
    {
      name: 'move-popup-html',
      closeBundle() {
        // Move popup.html from dist/src/ to dist/ if it exists there
        const srcPath = join(__dirname, 'dist', 'src', 'popup.html');
        const destPath = join(__dirname, 'dist', 'popup.html');
        if (existsSync(srcPath)) {
          copyFileSync(srcPath, destPath);
        }
      },
    },
  ],
})
