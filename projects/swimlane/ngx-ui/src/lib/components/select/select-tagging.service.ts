import { Injectable } from '@angular/core';

const NAMED_ENTITIES: Readonly<Record<string, string>> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' '
};

const TAG_SEPARATOR_PATTERN = /[,;\n\r\t\v\f\u2028\u2029]+/;

/**
 * Injectable service that encapsulates tag text processing (normalizing,
 * splitting, entity decoding, markup stripping) and caret-offset measurement
 * for the select component's inline-tagging mode.
 */
@Injectable({ providedIn: 'root' })
export class SelectTaggingService {
  private measureCtx: CanvasRenderingContext2D | null | undefined;

  // ---------------------------------------------------------------------------
  // Tag text processing
  // ---------------------------------------------------------------------------

  /** Normalize a raw tag value: decode entities, strip markup, trim. */
  normalizeInput(value: string): string {
    return (
      this.prepareBatch(value)
        // eslint-disable-next-line no-control-regex -- strip control chars from pasted text
        .replace(/[\u0000-\u001f\u007f]/g, '')
        .replace(/[\u200b-\u200d\ufeff]/g, '')
        .replace(/\u00a0/g, ' ')
        .trim()
    );
  }

  /** Split a pasted/typed value on separator characters into individual tags. */
  splitBatch(raw: string): string[] {
    return this.prepareBatch(raw)
      .split(TAG_SEPARATOR_PATTERN)
      .map(part =>
        part
          // eslint-disable-next-line no-control-regex -- strip residual control chars per fragment
          .replace(/[\u0000-\u001f\u007f]/g, '')
          .replace(/[\u200b-\u200d\ufeff]/g, '')
          .replace(/\u00a0/g, ' ')
          .trim()
      )
      .filter(Boolean);
  }

  /** Whether the raw input contains a batch separator (comma, semicolon, etc.). */
  batchHasSeparator(raw: string): boolean {
    return TAG_SEPARATOR_PATTERN.test(this.prepareBatch(raw));
  }

  /** Extract a plain-text label from a tag value or option name. */
  plainLabel(value: unknown, name?: unknown): string {
    if (typeof name === 'string') return name;
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    return '';
  }

  // ---------------------------------------------------------------------------
  // Caret measurement (maps a click on a chip label to a character offset)
  // ---------------------------------------------------------------------------

  /** Maps a click's clientX on a (possibly truncated) chip label to a character index. */
  caretOffsetAtClientX(host: HTMLElement, text: string, clientX: number): number {
    if (!text) return 0;

    const style = getComputedStyle(host);
    const rect = host.getBoundingClientRect();
    const padLeft = parseFloat(style.paddingLeft) || 0;
    const padRight = parseFloat(style.paddingRight) || 0;
    const visibleWidth = Math.max(0, rect.width - padLeft - padRight);
    const clickX = clientX - (rect.left + padLeft);

    if (clickX <= 0) return 0;
    if (visibleWidth && clickX >= visibleWidth) {
      return this.textWidth(text, style) <= visibleWidth ? text.length : this.offsetForWidth(text, style, visibleWidth);
    }

    return this.offsetForWidth(text, style, clickX);
  }

  // ---------------------------------------------------------------------------
  // Private helpers – tag processing
  // ---------------------------------------------------------------------------

  private prepareBatch(raw: string): string {
    return this.expandWhitespaceEscapes(this.decodeMarkup(raw));
  }

  private expandWhitespaceEscapes(value: string): string {
    return value
      .replace(/\\r\\n/gi, '\n')
      .replace(/\\n/gi, '\n')
      .replace(/\\r/gi, '\n')
      .replace(/\\t/gi, '\t');
  }

  private decodeMarkup(value: string): string {
    return this.stripMarkup(this.decodeEntitiesOnce(value));
  }

  private decodeEntitiesOnce(value: string): string {
    return value.replace(
      /&(?:([a-z]+)|#(\d+)|#x([0-9a-f]+));/gi,
      (match: string, named: string | undefined, dec: string | undefined, hex: string | undefined): string => {
        if (named) {
          const decoded = NAMED_ENTITIES[named.toLowerCase()];
          return decoded !== undefined ? decoded : match;
        }
        const codePoint = hex ? parseInt(hex, 16) : parseInt(dec!, 10);
        if (!Number.isFinite(codePoint) || codePoint < 0 || codePoint > 0x10ffff) {
          return match;
        }
        try {
          return String.fromCodePoint(codePoint);
        } catch {
          return match;
        }
      }
    );
  }

  private stripMarkup(value: string): string {
    let previous = '';
    let next = value;
    while (next !== previous) {
      previous = next;
      next = next.replace(/<[^>]*>/g, '');
    }
    return next.replace(/[<>]/g, '');
  }

  // ---------------------------------------------------------------------------
  // Private helpers – caret measurement
  // ---------------------------------------------------------------------------

  private getMeasureContext(): CanvasRenderingContext2D | null {
    if (this.measureCtx !== undefined) return this.measureCtx;
    this.measureCtx = document.createElement('canvas').getContext('2d');
    return this.measureCtx;
  }

  private cssFont(style: CSSStyleDeclaration): string {
    return style.font && style.font !== 'inherit'
      ? style.font
      : `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`.trim();
  }

  private letterSpacing(style: CSSStyleDeclaration): number {
    return style.letterSpacing === 'normal' ? 0 : parseFloat(style.letterSpacing) || 0;
  }

  private textWidth(text: string, style: CSSStyleDeclaration): number {
    const ctx = this.getMeasureContext();
    if (!ctx) return 0;
    ctx.font = this.cssFont(style);
    return ctx.measureText(text).width;
  }

  private offsetForWidth(text: string, style: CSSStyleDeclaration, target: number): number {
    const spacing = this.letterSpacing(style);
    let acc = 0;
    for (let i = 0; i < text.length; i++) {
      const charWidth = this.textWidth(text[i], style) + spacing;
      if (target < acc + charWidth / 2) return i;
      acc += charWidth;
    }
    return text.length;
  }
}
