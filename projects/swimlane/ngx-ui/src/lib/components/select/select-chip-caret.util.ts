/** Maps a click on a (possibly truncated) chip label to a character index. */

let measureCtx: CanvasRenderingContext2D | null | undefined;

function measureContext(): CanvasRenderingContext2D | null {
  if (measureCtx !== undefined) return measureCtx;
  measureCtx = document.createElement('canvas').getContext('2d');
  return measureCtx;
}

function cssFont(style: CSSStyleDeclaration): string {
  return style.font && style.font !== 'inherit'
    ? style.font
    : `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`.trim();
}

function letterSpacing(style: CSSStyleDeclaration): number {
  return style.letterSpacing === 'normal' ? 0 : parseFloat(style.letterSpacing) || 0;
}

function textWidth(text: string, style: CSSStyleDeclaration): number {
  const ctx = measureContext();
  if (!ctx) return 0;
  ctx.font = cssFont(style);
  return ctx.measureText(text).width;
}

function offsetForWidth(text: string, style: CSSStyleDeclaration, target: number): number {
  const spacing = letterSpacing(style);
  let acc = 0;
  for (let i = 0; i < text.length; i++) {
    const charWidth = textWidth(text[i], style) + spacing;
    if (target < acc + charWidth / 2) return i;
    acc += charWidth;
  }
  return text.length;
}

export function caretOffsetAtClientX(host: HTMLElement, text: string, clientX: number): number {
  if (!text) return 0;

  const style = getComputedStyle(host);
  const rect = host.getBoundingClientRect();
  const padLeft = parseFloat(style.paddingLeft) || 0;
  const padRight = parseFloat(style.paddingRight) || 0;
  const visibleWidth = Math.max(0, rect.width - padLeft - padRight);
  const clickX = clientX - (rect.left + padLeft);

  if (clickX <= 0) return 0;
  if (visibleWidth && clickX >= visibleWidth) {
    return textWidth(text, style) <= visibleWidth ? text.length : offsetForWidth(text, style, visibleWidth);
  }

  return offsetForWidth(text, style, clickX);
}
