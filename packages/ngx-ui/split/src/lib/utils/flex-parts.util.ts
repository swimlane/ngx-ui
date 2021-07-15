export type FlexParts = [grow: string, shrink: string, basic: string]; // grow, shrink, basis

export function partsToStyle(parts: FlexParts): string {
  const [grow, shrink, basis] = parts;
  return `${grow} ${shrink} ${basis}`;
}

export function basisToParts(grow: string, shrink: string, flexBasis: string): FlexParts {
  // TODO: validate?
  const parts = flexBasis.split(' ');
  if (parts.length === 3) {
    return parts as FlexParts;
  }
  return [grow, shrink, flexBasis];
}
