import { ThrottleOptions } from './throttle-options.interface';

/**
 * Throttle a function
 *
 * @param func    function to execute
 * @param wait    duration to wait
 * @param options options
 * @returns anything
 */
export function throttle(func: () => void, wait: number, options?: ThrottleOptions): any {
  options = options || {};

  let context: any;
  let args: IArguments;
  let result: any;
  let timeout = null;
  let previous = 0;

  const later = () => {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    result = func.apply(context, args);
  };

  return function () {
    const now = +new Date();

    if (!previous && options.leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this;
    // eslint-disable-next-line prefer-rest-params
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
