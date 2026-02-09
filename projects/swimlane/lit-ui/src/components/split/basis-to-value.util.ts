export function basisToValue(basis: string | number): number {
  if (typeof basis === 'string') {
    return Number(basis.replace(/%/g, '').replace(/px/g, '').trim());
  }
  return basis;
}
