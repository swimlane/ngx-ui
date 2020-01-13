/**
 * Defatul filterDefault function
 *
 * @param filter
 */
export function filterDefault(filter: any) {
  return (value: any) => {
    return !filter || filter === value;
  };
}
