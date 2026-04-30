import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      allowExternal: true,
      include: [resolve(__dirname, '../swim-ui/src') + '/**/*.ts'],
      exclude: ['**/*.spec.ts', '**/demo/**', '**/index.ts'],
      reporter: ['text', 'html']
    }
  },
  resolve: {
    alias: {
      '@swimlane/swim-ui': resolve(__dirname, '../swim-ui/src/index.ts'),
      '@swimlane/swim-ui/button': resolve(__dirname, '../swim-ui/src/components/button/index.ts'),
      '@swimlane/swim-ui/input': resolve(__dirname, '../swim-ui/src/components/input/index.ts'),
      '@swimlane/swim-ui/select': resolve(__dirname, '../swim-ui/src/components/select/index.ts'),
      '@swimlane/swim-ui/icon': resolve(__dirname, '../swim-ui/src/components/icon/index.ts'),
      '@swimlane/swim-ui/toggle': resolve(__dirname, '../swim-ui/src/components/toggle/index.ts'),
      '@swimlane/swim-ui/checkbox': resolve(__dirname, '../swim-ui/src/components/checkbox/index.ts'),
      '@swimlane/swim-ui/button-group': resolve(__dirname, '../swim-ui/src/components/button-group/index.ts'),
      '@swimlane/swim-ui/button-toggle': resolve(__dirname, '../swim-ui/src/components/button-toggle/index.ts'),
      '@swimlane/swim-ui/calendar': resolve(__dirname, '../swim-ui/src/components/calendar/index.ts'),
      '@swimlane/swim-ui/card': resolve(__dirname, '../swim-ui/src/components/card/index.ts'),
      '@swimlane/swim-ui/date-time': resolve(__dirname, '../swim-ui/src/components/date-time/index.ts'),
      '@swimlane/swim-ui/dialog': resolve(__dirname, '../swim-ui/src/components/dialog/index.ts'),
      '@swimlane/swim-ui/drawer': resolve(__dirname, '../swim-ui/src/components/drawer/index.ts'),
      '@swimlane/swim-ui/list': resolve(__dirname, '../swim-ui/src/components/list/index.ts'),
      '@swimlane/swim-ui/navbar': resolve(__dirname, '../swim-ui/src/components/navbar/index.ts'),
      '@swimlane/swim-ui/progress-spinner': resolve(__dirname, '../swim-ui/src/components/progress-spinner/index.ts'),
      '@swimlane/swim-ui/radio': resolve(__dirname, '../swim-ui/src/components/radio/index.ts'),
      '@swimlane/swim-ui/section': resolve(__dirname, '../swim-ui/src/components/section/index.ts'),
      '@swimlane/swim-ui/slider': resolve(__dirname, '../swim-ui/src/components/slider/index.ts'),
      '@swimlane/swim-ui/split': resolve(__dirname, '../swim-ui/src/components/split/index.ts'),
      '@swimlane/swim-ui/tabs': resolve(__dirname, '../swim-ui/src/components/tabs/index.ts'),
      '@swimlane/swim-ui/tooltip': resolve(__dirname, '../swim-ui/src/components/tooltip/index.ts')
    }
  }
});
