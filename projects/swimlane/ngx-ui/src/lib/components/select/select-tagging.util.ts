const NAMED_ENTITIES: Readonly<Record<string, string>> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' '
};

const TAG_SEPARATOR_PATTERN = /[,;\n\r\t\v\f\u2028\u2029]+/;

function expandWhitespaceEscapes(value: string): string {
  return value
    .replace(/\\r\\n/gi, '\n')
    .replace(/\\n/gi, '\n')
    .replace(/\\r/gi, '\n')
    .replace(/\\t/gi, '\t');
}

function prepareFreeTagBatch(raw: string): string {
  return expandWhitespaceEscapes(decodeFreeTagMarkup(raw));
}

function decodeEntityReference(
  match: string,
  named: string | undefined,
  dec: string | undefined,
  hex: string | undefined
): string {
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

function decodeEntitiesOnce(value: string): string {
  return value.replace(/&(?:([a-z]+)|#(\d+)|#x([0-9a-f]+));/gi, decodeEntityReference);
}

function stripMarkup(value: string): string {
  let previous = '';
  let next = value;
  while (next !== previous) {
    previous = next;
    next = next.replace(/<[^>]*>/g, '');
  }
  return next.replace(/[<>]/g, '');
}

export function decodeFreeTagMarkup(value: string): string {
  return stripMarkup(decodeEntitiesOnce(value));
}

export function freeTagBatchHasSeparator(raw: string): boolean {
  return TAG_SEPARATOR_PATTERN.test(prepareFreeTagBatch(raw));
}

export function normalizeFreeTagInput(value: string): string {
  return (
    prepareFreeTagBatch(value)
      // eslint-disable-next-line no-control-regex -- strip control chars from pasted text
      .replace(/[\u0000-\u001f\u007f]/g, '')
      .replace(/[\u200b-\u200d\ufeff]/g, '')
      .replace(/\u00a0/g, ' ')
      .trim()
  );
}

export function splitFreeTagBatch(raw: string): string[] {
  return prepareFreeTagBatch(raw)
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

export function freeTagPlainLabel(value: unknown, name?: unknown): string {
  if (typeof name === 'string') return name;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return '';
}
