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
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (_: any, key: string, descriptor: any): any => {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: throttle(descriptor.value, duration, options)
        });

        // eslint-disable-next-line security/detect-object-injection
        return this[key];
      }
    };
  };
}
