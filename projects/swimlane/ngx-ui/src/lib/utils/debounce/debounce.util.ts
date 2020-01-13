/**
 * Debounce a function
 * @param func      function to executoe
 * @param wait      wait duration
 * @param immediate wait or immediate executue
 */
export function debounce(func: () => void, wait: number, immediate?: boolean) {
  let timeout: any;
  let args: IArguments;
  let context: any;
  let timestamp: Date;
  let result: any;

  return function() {
    context = this;
    args = arguments;
    timestamp = new Date();

    function later() {
      const now = new Date();
      const last = now.getTime() - timestamp.getTime();

      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
        }
      }
    }

    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }

    if (callNow) {
      result = func.apply(context, args);
    }

    return result;
  };
}
