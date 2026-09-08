import { freeTagPlainLabel, normalizeFreeTagInput, splitFreeTagBatch } from './select-tagging.util';

describe('normalizeFreeTagInput', () => {
  it('strips complete HTML tags from pasted text', () => {
    expect(normalizeFreeTagInput('hello <b>world</b>')).toBe('hello world');
  });

  it('decodes common HTML entities in a single pass', () => {
    expect(normalizeFreeTagInput('AT&amp;T')).toBe('AT&T');
    expect(normalizeFreeTagInput('&lt;div&gt;')).toBe('<div>');
    expect(normalizeFreeTagInput('a &gt; b')).toBe('a > b');
    expect(normalizeFreeTagInput('a &lt; b')).toBe('a < b');
    expect(normalizeFreeTagInput('&quot;quoted&quot;')).toBe('"quoted"');
    expect(normalizeFreeTagInput('&#39;x&#39;')).toBe("'x'");
  });

  it('only unescapes entities once (&amp;amp; → &amp;)', () => {
    expect(normalizeFreeTagInput('&amp;amp;')).toBe('&amp;');
  });

  it('rejects whitespace-only fragments', () => {
    expect(normalizeFreeTagInput('   ')).toBe('');
    expect(normalizeFreeTagInput('\n\t')).toBe('');
  });

  it('trims leading and trailing whitespace', () => {
    expect(normalizeFreeTagInput('  hello  ')).toBe('hello');
  });

  it('strips control characters and zero-width spaces', () => {
    expect(normalizeFreeTagInput('one\u200Btwo')).toBe('onetwo');
    expect(normalizeFreeTagInput('a\u0000b')).toBe('ab');
  });

  it('preserves emoji and unicode letters', () => {
    expect(normalizeFreeTagInput('café 🎉')).toBe('café 🎉');
  });

  it('leaves incomplete tag-like text alone', () => {
    expect(normalizeFreeTagInput('<script')).toBe('<script');
    expect(normalizeFreeTagInput('<')).toBe('<');
    expect(normalizeFreeTagInput('>')).toBe('>');
    expect(normalizeFreeTagInput('&')).toBe('&');
  });

  it('strips a complete script element but does not claim XSS safety', () => {
    expect(normalizeFreeTagInput('<script>alert(1)</script>')).toBe('alert(1)');
  });
});

describe('splitFreeTagBatch', () => {
  it('sanitizes before splitting so entity semicolons are preserved', () => {
    expect(splitFreeTagBatch('AT&amp;T, hello <b>world</b>')).toEqual(['AT&T', 'hello world']);
  });

  it('splits on commas, semicolons, and newlines after markup decode', () => {
    expect(splitFreeTagBatch(' <b>one</b>, two\u200B;three\nfour')).toEqual(['one', 'two', 'three', 'four']);
  });

  it('returns a single tag when there are no separators', () => {
    expect(splitFreeTagBatch('AT&amp;T')).toEqual(['AT&T']);
  });

  it('drops empty and whitespace-only fragments', () => {
    expect(splitFreeTagBatch('a,  ,b')).toEqual(['a', 'b']);
  });
});

describe('freeTagPlainLabel', () => {
  it('prefers a string name', () => {
    expect(freeTagPlainLabel('value', 'Name')).toBe('Name');
  });

  it('falls back to string values', () => {
    expect(freeTagPlainLabel('alpha')).toBe('alpha');
  });

  it('stringifies numbers and booleans', () => {
    expect(freeTagPlainLabel(42)).toBe('42');
    expect(freeTagPlainLabel(true)).toBe('true');
  });

  it('does not stringify arbitrary objects', () => {
    expect(freeTagPlainLabel({ foo: 1 })).toBe('');
    expect(freeTagPlainLabel(null)).toBe('');
    expect(freeTagPlainLabel(undefined)).toBe('');
  });
});
