export function containsFilter(value, keyword, options?, depth = 0): boolean {
  if (value === undefined || value === null) return false;
  if (depth > 2) return false;

  const type = typeof value;

  if (type === 'string') {
    if (!isNaN(value)) return value === keyword;
    const idx = options.filterCaseSensitive ?
      value.indexOf(keyword) :
      value.search(new RegExp(keyword, 'i'));
    return idx > -1;
  } else if (type === 'object') {
    const keys = Object.keys(value);

    for (const k of keys) {
      if (containsFilter(value[k], keyword, options, depth + 1)) {
        return true;
      }
    }
  }
}
