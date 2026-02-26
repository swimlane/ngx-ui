import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/ngx-ui/swim-ui/' : '/',
  root: 'demo',
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@swimlane/swim-ui': resolve(__dirname, './src')
    }
  },
  server: {
    port: 4300
  }
});
