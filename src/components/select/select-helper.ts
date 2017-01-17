export function containsFilter(value, keyword, depth = 0): boolean {
  if(value === undefined || value === null) return false;
  if(depth > 2) return false;

  const type = typeof value;

  if (type === 'string') {
    if(!isNaN(value)) return value === keyword;
    return value.indexOf(keyword) > -1;
  } else if(type === 'object') {
    const keys = Object.keys(value);

    for(const k of keys) {
      if(containsFilter(value[k], keyword, depth + 1)) {
        return true;
      }
    }
  }
}
