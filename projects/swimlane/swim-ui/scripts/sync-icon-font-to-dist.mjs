/**
 * After tsc, copy swim-ui-icon.woff2 next to emitted JS so import.meta.url resolves for npm consumers.
 */
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const srcFont = resolve(root, 'src/assets/swim-ui-icon.woff2');
const distFont = resolve(root, 'dist/assets/swim-ui-icon.woff2');

if (!existsSync(srcFont)) {
  console.warn('[sync-icon-font-to-dist] src/assets/swim-ui-icon.woff2 missing; run yarn copy:icon-font first.');
  process.exit(0);
}

mkdirSync(dirname(distFont), { recursive: true });
copyFileSync(srcFont, distFont);
console.log('[sync-icon-font-to-dist] Copied swim-ui-icon.woff2 → dist/assets/');
