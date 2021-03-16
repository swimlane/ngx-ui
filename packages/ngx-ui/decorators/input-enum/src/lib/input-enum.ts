import { getEnumKey } from '@swimlane/ngx-ui/utils/get-enum-key';

export function InputEnum<T extends Record<string, unknown>>(
  enumType: T
): PropertyDecorator {
  return (target, propertyKey) => {
    // double underscore used as to not pollute the single underscore private 'namespace'
    const enumPropertyKey = String(propertyKey).substr(1);

    Object.defineProperty(target, propertyKey, {
      get(): keyof T {
        return getEnumKey(enumType, this[enumPropertyKey]);
      },
      set(v: unknown) {
        this[enumPropertyKey] = enumType[v as keyof T];
      },
    });
  };
}
