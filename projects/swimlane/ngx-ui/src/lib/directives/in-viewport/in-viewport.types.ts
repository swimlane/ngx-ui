export interface InViewportOptions {
  /** IntersectionObserver root. Defaults to the browser viewport. */
  root?: Element | null;
  /** CSS margin around the root. */
  rootMargin?: string;
  /** IntersectionObserver threshold(s). Defaults to `[0, 1]`. */
  threshold?: number | number[];
  /**
   * When true (default), any intersection counts as visible.
   * When false, the element must be fully visible (`intersectionRatio >= 1`).
   */
  partial?: boolean;
}

export interface InViewportActionEvent {
  visible: boolean;
  target: HTMLElement;
  entry?: IntersectionObserverEntry;
}
