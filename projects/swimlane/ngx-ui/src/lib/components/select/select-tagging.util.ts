/**
 * Decode common entities and strip complete HTML tags from free-tag text.
 * Does not remove control characters or trim — callers do that per fragment
 * after splitting so `\n` / `\t` remain available as separators.
 *
 * This is paste/cleanup normalization — not an HTML security boundary.
 * Safety for free tags comes from rendering them as text, not as HTML.
 *
 * Entity decoding is a single pass (e.g. `&amp;amp;` → `&amp;`).
 * Must run on the full batch *before* splitting on `;`, otherwise `&amp;T` breaks apart.
 */
export function decodeFreeTagMarkup(value: string): string {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'");
}

/** Clean a single free-tag fragment (control chars, zero-width spaces, trim). */
export function normalizeFreeTagInput(value: string): string {
  return (
    decodeFreeTagMarkup(value)
      // eslint-disable-next-line no-control-regex -- strip control chars from pasted text
      .replace(/[\u0000-\u001f\u007f]/g, '')
      .replace(/[\u200b-\u200d\ufeff]/g, '')
      .replace(/\u00a0/g, ' ')
      .trim()
  );
}

/**
 * Split a typed/pasted free-tag batch into normalized plain tags.
 * Decodes markup on the whole payload before separator split so entity `;` is preserved.
 */
export function splitFreeTagBatch(raw: string): string[] {
  return decodeFreeTagMarkup(raw)
    .split(/[,;\n\r\t]+/)
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

/** Plain display/edit label for a free-tag domain value. Avoids `[object Object]`. */
export function freeTagPlainLabel(value: unknown, name?: unknown): string {
  if (typeof name === 'string') return name;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return '';
}
