import { SWIM_ICON_FONT_FAMILY } from './icon-font-loader';

const FONT_FACE_ATTR = 'data-swim-ui-icon-font-face';

let iconFontFaceMicrotaskScheduledSwimUi = false;

/**
 * Injects a document-level @font-face for SWIM_ICON_FONT_FAMILY once per document.
 * CDN and npm builds resolve the woff2 URL via import.meta.url (Vite) or dist/assets (tsc).
 */
export function ensureSwimUiIconFontFace(): void {
  if (typeof document === 'undefined') return;
  if (document.head.querySelector(`style[${FONT_FACE_ATTR}]`)) return;

  const fontUrl = new URL('../../assets/swim-ui-icon.woff2', import.meta.url).href;

  const style = document.createElement('style');
  style.setAttribute(FONT_FACE_ATTR, '');
  style.textContent = `@font-face{font-family:'${SWIM_ICON_FONT_FAMILY}';src:url('${fontUrl}') format('woff2');font-weight:normal;font-style:normal;font-display:block;}`;
  document.head.appendChild(style);
}

/** Defer to microtask so document.head exists when icon is imported from a synchronous head script. */
export function scheduleEnsureSwimUiIconFontFace(): void {
  if (typeof document === 'undefined') return;
  if (document.head.querySelector(`style[${FONT_FACE_ATTR}]`)) return;
  if (iconFontFaceMicrotaskScheduledSwimUi) return;
  iconFontFaceMicrotaskScheduledSwimUi = true;
  queueMicrotask(() => {
    iconFontFaceMicrotaskScheduledSwimUi = false;
    ensureSwimUiIconFontFace();
  });
}
