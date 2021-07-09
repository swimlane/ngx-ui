import { ThrottleOptions } from './throttle-options.interface';

export function throttle(
  fn: () => void,
  wait: number,
  options: ThrottleOptions = {}
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;

  const later = (thisCtx: unknown, ...args: unknown[]) => {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    return fn.apply(thisCtx, args as []);
  };

  return function throttled(this: unknown, ...args: unknown[]) {
    const now = +new Date();

    if (!previous && options.leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);

    if (remaining <= 0) {
      clearTimeout(timeout as ReturnType<typeof setTimeout>);
      timeout = null;
      previous = now;
      return fn.apply(this, args as []);
    }

    if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => later(this, args), remaining);
    }
  };
}
