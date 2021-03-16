export function debounce(func: () => void, wait: number, immediate = false) {
  let timeout: number | null;
  return function(...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (timeout) clearTimeout(timeout);

    timeout = (setTimeout(function() {
      timeout = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!immediate) func.apply(context, args as any);
    }, wait) as unknown) as number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (immediate && !timeout) func.apply(context, args as any);
  };
}
