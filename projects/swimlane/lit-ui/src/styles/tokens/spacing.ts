/**
 * Spacing tokens matching @swimlane/ngx-ui design system
 */

export const spacing = {
  spacing0: '0',
  spacing2: '2px',
  spacing4: '4px',
  spacing8: '8px',
  spacing10: '10px',
  spacing16: '16px',
  spacing24: '24px',
  spacing32: '32px',
} as const;

export const radius = {
  radius2: '2px',
  radius4: '4px',
  radius8: '8px',
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;

