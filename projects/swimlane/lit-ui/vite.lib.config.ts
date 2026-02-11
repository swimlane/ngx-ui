import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SwimlaneLitUI',
      fileName: () => 'lit-ui.js',
      formats: ['es']
    },
    outDir: 'dist-cdn',
    emptyOutDir: true,
    rollupOptions: {
      external: id => id === 'lit' || id.startsWith('lit/'),
      output: {
        format: 'es',
        entryFileNames: 'lit-ui.js'
      }
    }
  }
});
