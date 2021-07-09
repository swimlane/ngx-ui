import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';

export type NumericInput = NumberInput;

export function NgxNumericInput(fallback?: number): PropertyDecorator {
  return (target, propertyKey) => {
    // double underscore used as to not pollute the single underscore private 'namespace'
    const coercedNumericKey = `__${String(propertyKey)}`;

    Object.defineProperty(target, propertyKey, {
      get(): number {
        return this[coercedNumericKey];
      },
      set(v: unknown) {
        this[coercedNumericKey] = fallback
          ? coerceNumberProperty(v, fallback)
          : coerceNumberProperty(v);
      },
    });
  };
}
