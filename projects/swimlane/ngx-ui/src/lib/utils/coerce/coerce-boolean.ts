import { coerceBooleanProperty } from '@angular/cdk/coercion';

export function CoerceBooleanProperty(): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Object, propertyKey: string | symbol): void {
    const _key = Symbol(String(propertyKey));
    target[_key] = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
      get(): boolean {
        return this[_key];
      },
      set(v: unknown) {
        this[_key] = coerceBooleanProperty(v);
      }
    });
  };
}
