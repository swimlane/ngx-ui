/**
 * Builds one self-contained CDN file per component (and lit-ui + styles) by running
 * Vite once per entry. This avoids shared chunks so each script is loadable on its own.
 */
import { spawnSync } from 'child_process';
import { rmSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const CDN_ENTRY_NAMES = [
  'lit-ui',
  'button',
  'button-group',
  'button-toggle',
  'calendar',
  'card',
  'checkbox',
  'date-time',
  'dialog',
  'drawer',
  'icon',
  'input',
  'section',
  'radio',
  'select',
  'slider',
  'split',
  'progress-spinner',
  'tabs',
  'toggle',
  'tooltip',
  'navbar',
  'list',
  'styles'
];

const distCdn = resolve(root, 'dist-cdn');
if (existsSync(distCdn)) {
  rmSync(distCdn, { recursive: true });
}
mkdirSync(distCdn, { recursive: true });

for (const name of CDN_ENTRY_NAMES) {
  const result = spawnSync(
    'npx',
    ['vite', 'build', '--config', 'vite.lib.config.ts'],
    {
      env: { ...process.env, BUILD_CDN_ENTRY: name },
      cwd: root,
      stdio: 'inherit'
    }
  );
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
