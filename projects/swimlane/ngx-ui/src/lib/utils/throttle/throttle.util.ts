import { ThrottleOptions } from './throttle-options.interface';

/**
 * Throttle a function
 * @param func    function to execute
 * @param wait    duration to wait
 * @param options options
 */
export function throttle(func: () => void, wait: number, options?: ThrottleOptions) {
  options = options || {};

  let context: any;
  let args: IArguments;
  let result: any;
  let timeout = null;
  let previous = 0;

  function later() {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    result = func.apply(context, args);
  }

  return function() {
    const now = +new Date();

    if (!previous && options.leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}
