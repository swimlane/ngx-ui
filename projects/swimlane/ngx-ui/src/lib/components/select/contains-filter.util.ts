import { escapeRegExp } from '../../utils/regex/escape.util';

export function containsFilter(
  value: any,
  keyword: string,
  options: { filterCaseSensitive?: boolean },
  depth = 0
): boolean {
  if (value === undefined || value === null || depth > 2) {
    return false;
  }
  if (typeof value === 'number') {
    value = String(value);
  }
  if (typeof value === 'string') {
    const escapedKeyword = escapeRegExp(keyword);
    // eslint-disable-next-line
    const idx = options.filterCaseSensitive ? value.indexOf(keyword) : value.search(new RegExp(escapedKeyword, 'i'));
    return idx > -1;
  } else if (typeof value === 'object') {
    const keys = Object.getOwnPropertyNames(value);

    for (const k of keys) {
      if (containsFilter(value[k], keyword, options, depth + 1)) {
        return true;
      }
    }
  }
}
