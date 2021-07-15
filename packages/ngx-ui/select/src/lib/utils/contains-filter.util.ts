export function containsFilter(
  value: unknown | null,
  keyword: string,
  options: { filterCaseSensitive?: boolean },
  depth = 0
): boolean {
  if (value === undefined || value === null || depth > 2) {
    return false;
  }

  if (typeof value === 'string') {
    if (!isNaN(+value)) {
      return value === keyword;
    }

    const idx = options.filterCaseSensitive ? value.indexOf(keyword) : value.search(new RegExp(keyword, 'i'));
    return idx > -1;
  } else if (typeof value === 'object') {
    const keys = Object.getOwnPropertyNames(value);

    for (const k of keys) {
      if (containsFilter((value as Record<string, unknown>)[k], keyword, options, depth + 1)) {
        return true;
      }
    }
  }

  return false;
}
