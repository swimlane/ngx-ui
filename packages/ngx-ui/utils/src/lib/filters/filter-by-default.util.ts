/**
 * Default filterDefault function
 *
 * @param filter
 */
export function filterDefault<TValue = unknown>(
  filter: TValue
): (value: TValue) => boolean {
  return (value: TValue) => {
    return !filter || filter === value;
  };
}
