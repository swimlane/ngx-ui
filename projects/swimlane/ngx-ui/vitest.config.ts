import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['projects/swimlane/ngx-ui/src/test-setup.ts']
  }
});
