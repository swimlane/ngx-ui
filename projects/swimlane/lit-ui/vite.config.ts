import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/lit-ui/' : '/',
  root: 'demo',
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@swimlane/lit-ui': resolve(__dirname, './src')
    }
  },
  server: {
    port: 4300
  }
});
