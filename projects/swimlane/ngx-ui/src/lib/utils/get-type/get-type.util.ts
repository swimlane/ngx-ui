export const getType = (item: unknown): string => {
  if (item == null) {
    return 'null';
  }

  return Array.isArray(item) ? 'array' : typeof item;
};
