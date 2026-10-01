import fs from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import htmlInclude from './src/plugins/html-include.js';

const root = fileURLToPath(new URL('.', import.meta.url));

// страницы — все *.html в корне проекта; новая страница подхватывается сама
const pages = fs
  .readdirSync(root)
  .filter((file) => file.endsWith('.html'))
  .map((file) => fileURLToPath(new URL(file, import.meta.url)));

export default defineConfig({
  // относительные пути в сборке: работает из любой папки (GitHub Pages, любой хостинг)
  base: './',
  build: {
    // для GitHub Pages «main + /docs» раскомментировать:
    // outDir: 'docs',
    // emptyOutDir: true,
    rolldownOptions: {
      input: pages,
    },
  },
  plugins: [htmlInclude()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    open: true,
  },
});
