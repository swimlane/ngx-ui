export function debounce(fn: () => void, wait: number, immediate = false) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let timestamp: Date;

  return function debounced(this: unknown, ...args: unknown[]) {
    timestamp = new Date();

    const later = () => {
      const now = new Date();
      const last = now.getTime() - timestamp.getTime();

      if (last < wait) {
        timeout = setTimeout(() => later(), wait - last);
      } else {
        clearTimeout(timeout as ReturnType<typeof setTimeout>);
        timeout = null;
        if (!immediate) {
          return fn.apply(this, args as []);
        }
      }
    };

    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(() => later(), wait);
    }

    if (callNow) {
      return fn.apply(this, args as []);
    }
  };
}
