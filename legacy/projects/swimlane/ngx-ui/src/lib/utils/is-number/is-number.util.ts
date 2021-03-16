export function isNumber(value: any) {
  return !isNaN(parseInt(value, 10)) && isFinite(value);
}
