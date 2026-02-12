import { NGX_ICON_WOFF2_BASE64 } from './icon-font-data';

/**
 * Font family name used internally by lit-ui components.
 * Uses a unique name to avoid conflicts with the host application's
 * 'ngx-icon' font, which may be a different version with different
 * glyph-to-unicode mappings.
 */
export const SWIM_ICON_FONT_FAMILY = 'swim-ngx-icon';

let _fontInjected = false;

/**
 * Injects the @font-face declaration for the swim-ngx-icon font into the
 * document head. Uses an inline base64 data URI so the component is fully
 * self-contained and does not depend on the host application providing the
 * correct font file.
 *
 * This function is idempotent — calling it multiple times is safe; the
 * style element is only injected once.
 */
export function ensureIconFontLoaded(): void {
  if (_fontInjected) return;
  if (typeof document === 'undefined') return; // SSR guard

  const style = document.createElement('style');
  style.setAttribute('data-swim-icon-font', '');
  style.textContent = `
@font-face {
  font-family: '${SWIM_ICON_FONT_FAMILY}';
  src: url('data:font/woff2;base64,${NGX_ICON_WOFF2_BASE64}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
`;
  document.head.appendChild(style);
  _fontInjected = true;
}
