import { defineConfig } from 'vite';

const { resolve } = require('path');

export default defineConfig({
  build: {
    target: 'esnext',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        options: resolve(__dirname, 'options.html'),
        // popup: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'background.html'),
      },
    },
  },
});
