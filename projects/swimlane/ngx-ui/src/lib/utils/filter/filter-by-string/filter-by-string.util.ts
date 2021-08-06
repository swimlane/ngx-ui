// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const filterByString = (filter: string) => {
  filter = filter.toLowerCase();

  return (value: string) => {
    return !filter || value.toLowerCase().indexOf(filter) !== -1;
  };
};
