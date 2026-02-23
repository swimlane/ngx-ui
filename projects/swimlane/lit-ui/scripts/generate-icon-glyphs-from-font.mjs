/**
 * Generate icon-font-glyphs-platform.ts from a platform woff2 font file.
 * Reads the font's unicode → glyph name mapping and outputs CSS so swim-icon
 * uses the same codepoints as the platform font.
 *
 * Usage:
 *   node scripts/generate-icon-glyphs-from-font.mjs <path-or-url-to.woff2>
 *   FONT_URL=https://dev.swimlane.app/assets/ngx-icon-SWYRP4SX.woff2 node scripts/generate-icon-glyphs-from-font.mjs
 *
 * Requires: npm install fontkit (devDependency)
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fontkit = require('fontkit');

const __dirname = dirname(fileURLToPath(import.meta.url));
const litUiRoot = resolve(__dirname, '..');
const outPath = resolve(litUiRoot, 'src/components/icon/icon-font-glyphs-platform.ts');

const fontInput = process.argv[2] || process.env.FONT_URL || process.env.FONT_PATH;
if (!fontInput) {
  console.error('Usage: node generate-icon-glyphs-from-font.mjs <path-or-url-to.woff2>');
  console.error('   or: FONT_URL=<url> node generate-icon-glyphs-from-font.mjs');
  process.exit(1);
}

async function loadFontBuffer(input) {
  if (input.startsWith('http://') || input.startsWith('https://')) {
    const res = await fetch(input);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    const ab = await res.arrayBuffer();
    return Buffer.from(ab);
  }
  const path = input.startsWith('/') ? input : resolve(process.cwd(), input);
  return readFileSync(path);
}

function extractMapping(font) {
  // font gives unicode → glyph. We need glyph name → hex codepoint.
  const nameToCode = {};
  const PUA_START = 0xea01;
  const PUA_END = 0xeba7;
  for (let u = PUA_START; u <= PUA_END; u++) {
    const glyph = font.glyphForCodePoint(u);
    if (glyph && glyph.id !== 0 && glyph.name) {
      const hex = u.toString(16).toLowerCase();
      nameToCode[glyph.name] = hex;
    }
  }
  return nameToCode;
}

const buffer = await loadFontBuffer(fontInput);
const font = fontkit.create(buffer);
const nameToCode = extractMapping(font);
const names = Object.keys(nameToCode).sort();

const lines = [
  "import { css } from 'lit';",
  '',
  `/** Generated from platform font (${fontInput.replace(/^.*\//, '')}). Run: npm run generate:icon-glyphs:from-font */`,
  'export const iconFontGlyphs = css`',
  ...names.map((name) => {
    const code = nameToCode[name];
    const className = `lit-${name}`;
    return `  .swim-icon.${className}::before {
    content: '\\\\${code}';
  }`;
  }),
  '`;',
  ''
];

writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`[generate-icon-glyphs-from-font] Wrote ${names.length} glyphs from font → icon-font-glyphs-platform.ts`);
console.log(`  Font: ${fontInput}`);
console.log(`  Platform app can alias icon-font-glyphs to this file so swim-icon matches the platform font.`);