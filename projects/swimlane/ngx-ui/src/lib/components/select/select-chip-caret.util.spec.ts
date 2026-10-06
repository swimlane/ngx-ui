import { caretOffsetAtClientX } from './select-chip-caret.util';

describe('caretOffsetAtClientX', () => {
  it('returns 0 for empty text', () => {
    expect(caretOffsetAtClientX(document.createElement('span'), '', 10)).toBe(0);
  });

  it('returns 0 when the click is left of the label', () => {
    const host = document.createElement('span');
    Object.defineProperty(host, 'getBoundingClientRect', {
      value: () => ({ left: 50, width: 80, right: 130, top: 0, bottom: 20, height: 20 })
    });
    expect(caretOffsetAtClientX(host, 'hello', 40)).toBe(0);
  });
});
