export function containsFilter(value, keyword): boolean {
  const type = typeof value;

  if (type === 'string') {
    if(!isNaN(value)) return value === keyword;
    return value.indexOf(keyword) > -1;
  } else if(type === 'object') {
    const keys = Object.keys(value);

    for(let k of keys) {
      if(containsFilter(value[k], keyword)) {
        return true;
      }
    }
  }
}