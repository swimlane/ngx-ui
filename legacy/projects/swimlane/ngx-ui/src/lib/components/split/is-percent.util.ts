export function isPercent(basis: string): boolean {
  const hasCalc = String(basis).indexOf('calc') > -1;
  return String(basis).indexOf('%') > -1 && !hasCalc;
}
