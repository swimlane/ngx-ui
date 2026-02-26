/**
 * Color tokens matching @swimlane/ngx-ui design system
 */

export const colors = {
  // Blue
  blue100: 'rgb(224, 239, 255)',
  blue200: 'rgb(173, 212, 255)',
  blue300: 'rgb(122, 185, 255)',
  blue400: 'rgb(71, 158, 255)',
  blue500: 'rgb(20, 131, 255)',
  blue600: 'rgb(0, 106, 224)',
  blue700: 'rgb(0, 82, 173)',
  blue800: 'rgb(0, 58, 122)',
  blue900: 'rgb(0, 34, 71)',

  // Light Blue
  lightblue100: 'rgb(234, 249, 255)',
  lightblue200: 'rgb(184, 234, 254)',
  lightblue300: 'rgb(134, 219, 253)',
  lightblue400: 'rgb(84, 205, 252)',
  lightblue500: 'rgb(34, 190, 251)',
  lightblue600: 'rgb(4, 166, 230)',
  lightblue700: 'rgb(3, 130, 180)',
  lightblue800: 'rgb(2, 94, 130)',
  lightblue900: 'rgb(1, 58, 80)',

  // Green
  green100: 'rgb(206, 249, 240)',
  green200: 'rgb(161, 243, 226)',
  green300: 'rgb(116, 237, 212)',
  green400: 'rgb(71, 231, 198)',
  green500: 'rgb(29, 222, 182)',
  green600: 'rgb(23, 177, 145)',
  green700: 'rgb(17, 132, 108)',
  green800: 'rgb(11, 87, 71)',
  green900: 'rgb(5, 42, 34)',

  // Orange
  orange100: 'rgb(255, 244, 224)',
  orange200: 'rgb(255, 225, 173)',
  orange300: 'rgb(255, 206, 122)',
  orange400: 'rgb(255, 187, 71)',
  orange500: 'rgb(255, 168, 20)',
  orange600: 'rgb(224, 141, 0)',
  orange700: 'rgb(173, 109, 0)',
  orange800: 'rgb(122, 77, 0)',
  orange900: 'rgb(71, 45, 0)',

  // Red
  red100: 'rgb(255, 230, 224)',
  red200: 'rgb(255, 190, 173)',
  red300: 'rgb(255, 150, 122)',
  red400: 'rgb(255, 109, 71)',
  red500: 'rgb(255, 69, 20)',
  red600: 'rgb(224, 47, 0)',
  red700: 'rgb(173, 36, 0)',
  red800: 'rgb(122, 25, 0)',
  red900: 'rgb(71, 15, 0)',

  // Purple
  purple100: 'rgb(255, 255, 255)',
  purple200: 'rgb(239, 234, 252)',
  purple300: 'rgb(205, 190, 245)',
  purple400: 'rgb(172, 145, 239)',
  purple500: 'rgb(138, 101, 232)',
  purple600: 'rgb(104, 57, 225)',
  purple700: 'rgb(78, 30, 201)',
  purple800: 'rgb(61, 23, 157)',
  purple900: 'rgb(44, 17, 112)',

  // Grey
  grey050: 'rgb(235, 237, 242)',
  grey100: 'rgb(205, 210, 221)',
  grey150: 'rgb(190, 197, 211)',
  grey200: 'rgb(175, 183, 200)',
  grey250: 'rgb(160, 170, 190)',
  grey300: 'rgb(144, 156, 180)',
  grey350: 'rgb(129, 143, 169)',
  grey400: 'rgb(114, 129, 159)',
  grey450: 'rgb(100, 116, 147)',
  grey500: 'rgb(90, 104, 132)',
  grey550: 'rgb(80, 92, 117)',
  grey600: 'rgb(69, 80, 102)',
  grey650: 'rgb(59, 68, 87)',
  grey700: 'rgb(49, 56, 71)',
  grey725: 'rgb(43, 50, 64)',
  grey750: 'rgb(38, 44, 56)',
  grey775: 'rgb(33, 38, 49)',
  grey800: 'rgb(28, 32, 41)',
  grey825: 'rgb(23, 26, 33)',
  grey850: 'rgb(18, 20, 26)',
  grey875: 'rgb(12, 14, 18)',
  grey900: 'rgb(7, 8, 11)',

  // Base
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)'
} as const;

export type ColorToken = keyof typeof colors;
