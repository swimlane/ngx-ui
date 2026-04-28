/**
 * Copy the icon font binary from ngx-ui (single source of truth) into swim-ui assets.
 * Registered at runtime as font-family 'swim-ui-icon' (see src/components/icon/icon-font-face.ts),
 * distinct from ngx-ui's 'ngx-icon' so each browsing context can load its own @font-face.
 */
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const swimUiRoot = resolve(__dirname, '..');
const ngxUiFontsDir = resolve(swimUiRoot, '../ngx-ui/src/lib/assets/icons/iconfont/fonts');
const srcAssetsDir = resolve(swimUiRoot, 'src/assets');

const FONT_SOURCE = 'ngx-icon.woff2';
const FONT_TARGET = 'swim-ui-icon.woff2';

const source = resolve(ngxUiFontsDir, FONT_SOURCE);
const srcTarget = resolve(srcAssetsDir, FONT_TARGET);

if (!existsSync(source)) {
  console.warn(
    `[copy-icon-font] ${FONT_SOURCE} not found at ${ngxUiFontsDir}. ` +
      'Run from monorepo with ngx-ui, or place swim-ui-icon.woff2 in src/assets.'
  );
  process.exit(0);
}

if (!existsSync(srcAssetsDir)) {
  mkdirSync(srcAssetsDir, { recursive: true });
}

copyFileSync(source, srcTarget);
console.log(
  `[copy-icon-font] Copied ${FONT_SOURCE} → src/assets/${FONT_TARGET} (from ngx-ui).`
);
