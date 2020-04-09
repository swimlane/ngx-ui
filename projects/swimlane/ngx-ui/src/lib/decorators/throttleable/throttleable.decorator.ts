import { throttle } from '../../utils/throttle/throttle.util';
import { ThrottleOptions } from '../../utils/throttle/throttle-options.interface';

/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
export function throttleable(duration: number, options?: ThrottleOptions) {
  return function innerDecorator(_: any, key: string, descriptor: any) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: throttle(descriptor.value, duration, options),
        });

        return this[key];
      },
    };
  };
}
