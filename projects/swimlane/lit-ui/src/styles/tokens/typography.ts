/**
 * Typography tokens matching @swimlane/ngx-ui design system
 */

export const typography = {
  // Font sizes
  fontSizeBase: '16px',
  fontSizeXXS: '0.625rem', // 10px
  fontSizeXS: '0.75rem', // 12px
  fontSizeS: '0.875rem', // 14px
  fontSizeM: '1rem', // 16px
  fontSizeL: '1.125rem', // 18px
  fontSizeXL: '1.25rem', // 20px
  fontSize2XL: '1.5rem', // 24px
  fontSize3XL: '1.75rem', // 28px
  fontSize4XL: '2rem', // 32px
  fontSize5XL: '2.25rem', // 36px
  fontSize6XL: '3rem', // 48px

  // Line heights
  fontLineHeight100: '1.1',
  fontLineHeight200: '1.42',
  fontLineHeight300: '20px',
  fontLineHeight400: '40px',

  // Font weights
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightSemibold: '600',
  fontWeightBold: '700'
} as const;

export type TypographyToken = keyof typeof typography;
