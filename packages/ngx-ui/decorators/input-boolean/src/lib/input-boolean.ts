import { coerceBooleanProperty } from '@angular/cdk/coercion';

export function InputBoolean(): PropertyDecorator {
  return (target, propertyKey) => {
    // double underscore used as to not pollute the single underscore private 'namespace'
    const coercedBooleanKey = `__${String(propertyKey)}`;

    Object.defineProperty(target, propertyKey, {
      get(): boolean {
        return this[coercedBooleanKey];
      },
      set(v: unknown) {
        this[coercedBooleanKey] = coerceBooleanProperty(v);
      },
    });
  };
}
