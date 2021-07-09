export function getType(
  item: unknown
):
  | string
  | 'array'
  | 'undefined'
  | 'object'
  | 'boolean'
  | 'number'
  | 'string'
  | 'function'
  | 'symbol'
  | 'bigint' {
  if (item == null) {
    return 'null';
  }

  return Array.isArray(item) ? 'array' : typeof item;
}
