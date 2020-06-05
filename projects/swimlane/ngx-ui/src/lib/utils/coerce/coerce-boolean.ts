import { coerceBooleanProperty } from '@angular/cdk/coercion';

export function CoerceBooleanProperty(): PropertyDecorator {
  return function (target, propertyKey) {
    const _key = Symbol();
    target[_key] = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
      get(): boolean {
        return this[_key];
      },
      set(v: any) {
        this[_key] = coerceBooleanProperty(v);
      }
    });
  };
}
