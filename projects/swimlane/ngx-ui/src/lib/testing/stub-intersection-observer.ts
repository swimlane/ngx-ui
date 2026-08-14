/**
 * jsdom does not implement IntersectionObserver; in-viewport observers (e.g. dropdown menu) require it.
 * Call from `beforeAll` in specs that render those components.
 */
export function stubIntersectionObserverIfNeeded(): void {
  if (typeof globalThis.IntersectionObserver !== 'undefined') {
    return;
  }

  globalThis.IntersectionObserver = class implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin = '';
    readonly thresholds: ReadonlyArray<number> = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_cb: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}

    disconnect(): void {}
    observe(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
    unobserve(): void {}
  } as unknown as typeof IntersectionObserver;
}
