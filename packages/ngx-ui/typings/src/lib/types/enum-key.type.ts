export type EnumKey<
  T extends Record<string, unknown> = Record<string, unknown>
> = keyof T;
