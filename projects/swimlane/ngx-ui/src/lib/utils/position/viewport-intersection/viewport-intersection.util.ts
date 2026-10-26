export class ViewportIntersectionUtil {
  // If cross-origin iframes, fall back to the frame's viewport so menu direction can still be chosen.
  static isIntersectingBottom(entry: IntersectionObserverEntry): boolean {
    const bottom = entry.rootBounds?.bottom ?? window.innerHeight;
    return entry.boundingClientRect.bottom >= bottom;
  }

  static isIntersectingTop(entry: IntersectionObserverEntry): boolean {
    const top = entry.rootBounds?.top ?? 0;
    return entry.boundingClientRect.top - entry.boundingClientRect.height <= top;
  }
}
