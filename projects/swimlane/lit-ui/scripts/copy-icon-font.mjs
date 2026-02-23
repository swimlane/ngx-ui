/**
 * Copy the icon font from ngx-ui (single source of truth) into lit-ui demo assets.
 * Same family name as ngx-ui ('ngx-icon') so the platform can inject once for
 * both Angular and Lit. Demo loads it via demo/assets/lit-icons.css.
 */
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const litUiRoot = resolve(__dirname, '..');
const ngxUiFontsDir = resolve(litUiRoot, '../ngx-ui/src/lib/assets/icons/iconfont/fonts');
const demoAssetsDir = resolve(litUiRoot, 'demo/assets');

const FONT_SOURCE = 'ngx-icon.woff2';
const FONT_TARGET = 'ngx-icon.woff2';

const source = resolve(ngxUiFontsDir, FONT_SOURCE);
const target = resolve(demoAssetsDir, FONT_TARGET);

if (!existsSync(source)) {
  console.warn(
    `[copy-icon-font] ${FONT_SOURCE} not found at ${ngxUiFontsDir}. ` +
      'Demo will need ngx-icon.woff2 in demo/assets (e.g. from a previous copy or your own build).'
  );
  process.exit(0);
}

if (!existsSync(demoAssetsDir)) {
  mkdirSync(demoAssetsDir, { recursive: true });
}

copyFileSync(source, target);
console.log(`[copy-icon-font] Copied ${FONT_SOURCE} → demo/assets/${FONT_TARGET} (from ngx-ui).`);
