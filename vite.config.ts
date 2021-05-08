import { defineConfig } from 'vite';

const { resolve } = require('path');

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        options: resolve(__dirname, 'options.html'),
        popup: resolve(__dirname, 'popup.html'),
      },
    },
  },
});
