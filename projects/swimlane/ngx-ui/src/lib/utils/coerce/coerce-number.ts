import { coerceNumberProperty } from '@angular/cdk/coercion';

export function CoerceNumberProperty(fallback?: number): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    const _key = Symbol(String(propertyKey));
    target[_key] = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
      get(): number {
        return this[_key];
      },
      set(v: unknown) {
        this[_key] = coerceNumberProperty(v, fallback);
      }
    });
  };
}
