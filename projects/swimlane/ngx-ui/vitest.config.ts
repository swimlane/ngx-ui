import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

const projectDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(projectDir, '../../..');

export default defineConfig({
  root: projectDir,
  resolve: { preserveSymlinks: true, tsconfigPaths: true },
  plugins: [
    angular({
      tsconfig: resolve(projectDir, 'tsconfig.spec.json'),
      workspaceRoot
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [resolve(projectDir, 'src/vitest-setup.ts')],
    include: ['src/**/*.spec.ts'],
    // Align with previous Karma+Chrome behavior (synchronous spec evaluation + Zone).
    sequence: { hooks: 'stack' },
    coverage: {
      provider: 'v8',
      reportsDirectory: resolve(workspaceRoot, 'coverage/ngx-ui'),
      include: ['src/lib/**/*.ts'],
      exclude: [
        '**/*.spec.ts',
        '**/*.fixture.ts',
        'src/test.ts',
        'src/vitest-*.ts',
        'src/lib/testing/**',
        'src/public_api.ts',
        'src/**/index.ts',
        'src/lib/services/injection-registry/**',
        'src/lib/animations/**',
        '**/tsconfig.*',
        '**/ref.ts'
      ]
    }
  }
});
