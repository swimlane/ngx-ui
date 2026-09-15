import { freeTagPlainLabel, normalizeFreeTagInput, splitFreeTagBatch } from './select-tagging.util';

describe('normalizeFreeTagInput', () => {
  it('strips complete HTML tags from pasted text', () => {
    expect(normalizeFreeTagInput('hello <b>world</b>')).toBe('hello world');
  });

  it('decodes common HTML entities in a single pass', () => {
    expect(normalizeFreeTagInput('AT&amp;T')).toBe('AT&T');
    expect(normalizeFreeTagInput('a &gt; b')).toBe('a  b');
    expect(normalizeFreeTagInput('a &lt; b')).toBe('a  b');
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

  it('removes incomplete tag-like markup and leftover angle brackets', () => {
    expect(normalizeFreeTagInput('<script')).toBe('script');
    expect(normalizeFreeTagInput('<')).toBe('');
    expect(normalizeFreeTagInput('>')).toBe('');
    expect(normalizeFreeTagInput('&')).toBe('&');
  });

  it('strips a complete script element to its text content', () => {
    expect(normalizeFreeTagInput('<script>alert(1)</script>')).toBe('alert(1)');
  });

  it('strips entity-encoded tags after a single decode pass', () => {
    expect(normalizeFreeTagInput('&lt;div&gt;')).toBe('');
    expect(normalizeFreeTagInput('hello &lt;b&gt;world&lt;/b&gt;')).toBe('hello world');
  });
});

describe('splitFreeTagBatch', () => {
  it('sanitizes before splitting so entity semicolons are preserved', () => {
    expect(splitFreeTagBatch('AT&amp;T, hello <b>world</b>')).toEqual(['AT&T', 'hello world']);
  });

  it('splits on commas, semicolons, tabs, and newlines after markup decode', () => {
    expect(splitFreeTagBatch(' <b>one</b>, two\u200B;three\nfour')).toEqual(['one', 'two', 'three', 'four']);
    expect(splitFreeTagBatch('one\ttwo')).toEqual(['one', 'two']);
    expect(splitFreeTagBatch('a;b\nc')).toEqual(['a', 'b', 'c']);
  });

  it('splits on typed/pasted \\n \\t \\r escape sequences', () => {
    expect(splitFreeTagBatch('a;b\\nc')).toEqual(['a', 'b', 'c']);
    expect(splitFreeTagBatch('one\\ttwo')).toEqual(['one', 'two']);
    expect(splitFreeTagBatch('x\\r\\ny')).toEqual(['x', 'y']);
  });

  it('returns a single tag when there are no separators', () => {
    expect(splitFreeTagBatch('AT&amp;T')).toEqual(['AT&T']);
  });

  it('drops empty and whitespace-only fragments', () => {
    expect(splitFreeTagBatch('a,  ,b')).toEqual(['a', 'b']);
  });

  it('normalizes malformed HTML-like fragments before split', () => {
    expect(splitFreeTagBatch('<script,safe')).toEqual(['script', 'safe']);
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
