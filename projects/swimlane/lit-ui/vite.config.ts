import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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

