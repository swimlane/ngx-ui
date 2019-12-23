export function basisToValue(basis: string) {
  if (typeof basis === 'string') {
    return Number(basis.replace('%', '').replace('px', ''));
  }
  return basis;
}
