export function getEnumKey<T extends Record<string, unknown>>(enumType: T, enumValue: string): keyof T {
  return Object.keys(enumType).find((key) => enumType[key as keyof T] === enumValue) as keyof T;
}
