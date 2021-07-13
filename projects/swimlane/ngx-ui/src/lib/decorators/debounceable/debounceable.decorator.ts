import { debounce } from '../../utils/debounce/debounce.util';

/**
 * Debounce decorator
 *
 *  class MyClass {
 *    debounceable(10)
 *    myFn() { ... }
 *  }
 */
export function debounceable(duration: number, immediate?: boolean) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (_: any, key: string, descriptor: any): any => {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: debounce(descriptor.value, duration, immediate)
        });

        // eslint-disable-next-line security/detect-object-injection
        return this[key];
      }
    };
  };
}
