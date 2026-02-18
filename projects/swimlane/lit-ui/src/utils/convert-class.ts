/**
 * Converts an icon key (e.g. "set:name" or "name") to the CSS class string
 * used by the swim-icon font. Base class is 'swim-icon' to avoid collision
 * with host app's ngx-icon. Mirrors @swimlane/ngx-ui convert-class.util.ts
 */
export const convertClass = (input: string): string => {
  const classes = input
    .trim()
    .split(' ')
    .map(d => {
      const [set, icon] = d.split(':');
      return set.length ? `${set} ${set}-${icon}` : icon;
    })
    .join(' ');

  return `swim-icon ${classes}`;
};
