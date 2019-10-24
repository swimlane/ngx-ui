export function coerceBoolean(value: any): boolean {
  return value != null && `${value}` !== 'false';
}
