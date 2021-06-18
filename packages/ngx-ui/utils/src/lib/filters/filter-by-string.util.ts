export function filterByString(filter: string): (value: string) => boolean {
  filter = filter.toLowerCase();

  return (value: string) => !filter || value.toLowerCase().indexOf(filter) !== -1;
}
