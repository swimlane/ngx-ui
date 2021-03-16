export function filterByString(filter: string) {
  filter = filter.toLowerCase();

  return (value: string) => {
    return !filter || value.toLowerCase().indexOf(filter) !== -1;
  };
}
