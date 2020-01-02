export function basisToValue(basis: string | number) {
  if (typeof basis === 'string') {
    return Number(basis.replace('%', '').replace('px', ''));
  }

  return basis;
}
