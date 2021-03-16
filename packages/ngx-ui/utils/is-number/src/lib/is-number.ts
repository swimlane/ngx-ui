export function isNumber(value: unknown): boolean {
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }

  return isNumber(parseInt(value as string, 10));
}
