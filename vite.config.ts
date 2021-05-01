import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const { resolve } = require('path');

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        options: resolve(__dirname, 'options.html'),
        popup: resolve(__dirname, 'popup.html'),
      },
    },
  },
});
