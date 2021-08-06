/**
 * Defatul filterDefault function
 *
 * @param filter
 */
export const filterDefault = (filter: unknown) => {
  return (value: unknown): boolean => {
    return !filter || filter === value;
  };
};
