import { coerceNumberProperty } from '@angular/cdk/coercion';

export function CoerceNumberProperty(fallback?: number): PropertyDecorator {
  return function (target, propertyKey) {
    const _key = Symbol();
    target[_key] = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
      get(): number {
        return this[_key];
      },
      set(v: any) {
        this[_key] = coerceNumberProperty(v, fallback);
      }
    });
  };
}
