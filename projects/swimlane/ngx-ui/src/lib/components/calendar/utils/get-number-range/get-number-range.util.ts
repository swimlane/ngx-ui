/**
 * Creates a range for the given start/finish
 * @param start
 * @param finish
 * @return result of range
 */
export function getNumberRange(start: number, finish: number) {
  const arr: number[] = [];
  let i = start;

  while (i < finish) {
    arr.push(i++);
  }

  return arr;
}
