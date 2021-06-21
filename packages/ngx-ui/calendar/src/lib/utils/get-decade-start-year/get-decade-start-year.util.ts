/**
 * Return decade start year
 * @param year
 */
export function getDecadeStartYear(year: number): number {
  return year - ((year - 1) % 20);
}
