export function getType(item: any) {
  if (item == null) {
    return 'null';
  }

  return Array.isArray(item) ? 'array' : typeof item;
}
