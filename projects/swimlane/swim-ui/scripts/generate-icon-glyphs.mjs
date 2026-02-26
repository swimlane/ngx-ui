/**
 * Generate icon-font-glyphs.ts from ngx-ui's icons.scss $icons map.
 * Single source of truth: projects/swimlane/ngx-ui/src/lib/assets/icons/iconfont/scss/icons.scss
 * Same codepoints as ngx-icon.svg / icons.scss so the same font works for Angular and Lit.
 *
 * Run: npm run generate:icon-glyphs
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const litUiRoot = resolve(__dirname, '..');
const ngxIconsScss = resolve(litUiRoot, '../ngx-ui/src/lib/assets/icons/iconfont/scss/icons.scss');
const outPath = resolve(litUiRoot, 'src/components/icon/icon-font-glyphs.ts');

const scss = readFileSync(ngxIconsScss, 'utf8');
const map = {};
const re = /'([^']+)':\s*'([^']+)'/g;
let m;
while ((m = re.exec(scss)) !== null) {
  map[m[1]] = m[2];
}

const lines = [
  "import { css } from 'lit';",
  '',
  '/** Generated from ngx-ui icons.scss $icons. Run: npm run generate:icon-glyphs */',
  'export const iconFontGlyphs = css`',
  ...Object.entries(map).map(([name, code]) => {
    const className = `lit-${name}`;
    return `  .swim-icon.${className}::before {
    content: '\\\\${code}';
  }`;
  }),
  '`;',
  ''
];

writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`[generate-icon-glyphs] Wrote ${Object.keys(map).length} glyphs from icons.scss → icon-font-glyphs.ts`);
