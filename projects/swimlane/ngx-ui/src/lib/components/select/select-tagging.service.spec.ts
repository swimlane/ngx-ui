import { SelectTaggingService } from './select-tagging.service';

describe('SelectTaggingService', () => {
  let service: SelectTaggingService;

  beforeEach(() => {
    service = new SelectTaggingService();
  });

  describe('normalizeInput', () => {
    it('strips complete HTML tags from pasted text', () => {
      expect(service.normalizeInput('hello <b>world</b>')).toBe('hello world');
    });

    it('decodes common HTML entities in a single pass', () => {
      expect(service.normalizeInput('AT&amp;T')).toBe('AT&T');
      expect(service.normalizeInput('a &gt; b')).toBe('a  b');
      expect(service.normalizeInput('a &lt; b')).toBe('a  b');
      expect(service.normalizeInput('&quot;quoted&quot;')).toBe('"quoted"');
      expect(service.normalizeInput('&#39;x&#39;')).toBe("'x'");
    });

    it('only unescapes entities once (&amp;amp; → &amp;)', () => {
      expect(service.normalizeInput('&amp;amp;')).toBe('&amp;');
    });

    it('rejects whitespace-only fragments', () => {
      expect(service.normalizeInput('   ')).toBe('');
      expect(service.normalizeInput('\n\t')).toBe('');
    });

    it('trims leading and trailing whitespace', () => {
      expect(service.normalizeInput('  hello  ')).toBe('hello');
    });

    it('strips control characters and zero-width spaces', () => {
      expect(service.normalizeInput('one\u200Btwo')).toBe('onetwo');
      expect(service.normalizeInput('a\u0000b')).toBe('ab');
    });

    it('preserves emoji and unicode letters', () => {
      expect(service.normalizeInput('café 🎉')).toBe('café 🎉');
    });

    it('removes incomplete tag-like markup and leftover angle brackets', () => {
      expect(service.normalizeInput('<script')).toBe('script');
      expect(service.normalizeInput('<')).toBe('');
      expect(service.normalizeInput('>')).toBe('');
      expect(service.normalizeInput('&')).toBe('&');
    });

    it('strips a complete script element to its text content', () => {
      expect(service.normalizeInput('<script>alert(1)</script>')).toBe('alert(1)');
    });

    it('strips entity-encoded tags after a single decode pass', () => {
      expect(service.normalizeInput('&lt;div&gt;')).toBe('');
      expect(service.normalizeInput('hello &lt;b&gt;world&lt;/b&gt;')).toBe('hello world');
    });
  });

  describe('splitBatch', () => {
    it('sanitizes before splitting so entity semicolons are preserved', () => {
      expect(service.splitBatch('AT&amp;T, hello <b>world</b>')).toEqual(['AT&T', 'hello world']);
    });

    it('splits on commas, semicolons, tabs, and newlines after markup decode', () => {
      expect(service.splitBatch(' <b>one</b>, two\u200B;three\nfour')).toEqual(['one', 'two', 'three', 'four']);
      expect(service.splitBatch('one\ttwo')).toEqual(['one', 'two']);
      expect(service.splitBatch('a;b\nc')).toEqual(['a', 'b', 'c']);
    });

    it('splits on typed/pasted \\n \\t \\r escape sequences', () => {
      expect(service.splitBatch('a;b\\nc')).toEqual(['a', 'b', 'c']);
      expect(service.splitBatch('one\\ttwo')).toEqual(['one', 'two']);
      expect(service.splitBatch('x\\r\\ny')).toEqual(['x', 'y']);
    });

    it('returns a single tag when there are no separators', () => {
      expect(service.splitBatch('AT&amp;T')).toEqual(['AT&T']);
    });

    it('drops empty and whitespace-only fragments', () => {
      expect(service.splitBatch('a,  ,b')).toEqual(['a', 'b']);
    });

    it('normalizes malformed HTML-like fragments before split', () => {
      expect(service.splitBatch('<script,safe')).toEqual(['script', 'safe']);
    });
  });

  describe('plainLabel', () => {
    it('prefers a string name', () => {
      expect(service.plainLabel('value', 'Name')).toBe('Name');
    });

    it('falls back to string values', () => {
      expect(service.plainLabel('alpha')).toBe('alpha');
    });

    it('stringifies numbers and booleans', () => {
      expect(service.plainLabel(42)).toBe('42');
      expect(service.plainLabel(true)).toBe('true');
    });

    it('does not stringify arbitrary objects', () => {
      expect(service.plainLabel({ foo: 1 })).toBe('');
      expect(service.plainLabel(null)).toBe('');
      expect(service.plainLabel(undefined)).toBe('');
    });
  });

  describe('caretOffsetAtClientX', () => {
    it('returns 0 for empty text', () => {
      expect(service.caretOffsetAtClientX(document.createElement('span'), '', 10)).toBe(0);
    });

    it('returns 0 when the click is left of the label', () => {
      const host = document.createElement('span');
      Object.defineProperty(host, 'getBoundingClientRect', {
        value: () => ({ left: 50, width: 80, right: 130, top: 0, bottom: 20, height: 20 })
      });
      expect(service.caretOffsetAtClientX(host, 'hello', 40)).toBe(0);
    });
  });
});
