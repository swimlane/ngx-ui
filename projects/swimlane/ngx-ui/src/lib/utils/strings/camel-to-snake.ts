export function camelToSnake(source: string): string {
  if (!source) return '';

  return source
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();
}
