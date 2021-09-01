import { coerceNumberProperty } from '@angular/cdk/coercion';

export function CoerceNumberProperty(fallback?: number): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Object, propertyKey: string | symbol): void {
    const _key = Symbol();
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
