import { escapeRegExp } from './escape.util';

describe('escapeRegExp', () => {
  it('should escape special characters', () => {
    expect(escapeRegExp('Special regex characters .*+?^${}()|[]\\ are escaped')).toEqual(
      'Special regex characters \\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\ are escaped'
    );
  });
});
