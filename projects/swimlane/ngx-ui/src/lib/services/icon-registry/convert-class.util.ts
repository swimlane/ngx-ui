export function convertClass(input: string): string {
  const classes = input
    .trim()
    .split(' ')
    .map(d => {
      const [set, icon] = d.split(':');
      return set.length ? `${set} ${set}-${icon}` : icon;
    })
    .join(' ');

  return `ngx-icon ${classes}`;
}
