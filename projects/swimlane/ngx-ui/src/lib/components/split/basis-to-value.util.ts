export function basisToValue(basis: string | number) {
  if (typeof basis === 'string') {
    return Number(basis.replace(/%/g, '').replace(/px/g, ''));
  }

  return basis;
}
