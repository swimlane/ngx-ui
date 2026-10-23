import { isIntersectingViewportBottom, isIntersectingViewportTop } from './viewport-intersection.util';

function entry(rect: Partial<DOMRectReadOnly>, rootBounds: Partial<DOMRectReadOnly> | null): IntersectionObserverEntry {
  return {
    boundingClientRect: {
      top: 0,
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      width: 0,
      x: 0,
      y: 0,
      ...rect
    },
    rootBounds:
      rootBounds === null
        ? null
        : {
            top: 0,
            bottom: 800,
            height: 800,
            left: 0,
            right: 1000,
            width: 1000,
            x: 0,
            y: 0,
            ...rootBounds
          }
  } as IntersectionObserverEntry;
}

describe('viewport intersection', () => {
  it('compares against rootBounds when the viewport rect is present', () => {
    expect(isIntersectingViewportBottom(entry({ bottom: 900, height: 40, top: 860 }, { bottom: 800 }))).toBe(true);
    expect(isIntersectingViewportBottom(entry({ bottom: 100, height: 40, top: 60 }, { bottom: 800 }))).toBe(false);
    expect(isIntersectingViewportTop(entry({ top: 10, height: 40, bottom: 50 }, { top: 20 }))).toBe(true);
    expect(isIntersectingViewportTop(entry({ top: 100, height: 40, bottom: 140 }, { top: 0 }))).toBe(false);
  });

  it('uses the frame viewport when rootBounds is null', () => {
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(500);

    expect(isIntersectingViewportBottom(entry({ bottom: 500, height: 40, top: 460 }, null))).toBe(true);
    expect(isIntersectingViewportBottom(entry({ bottom: 100, height: 40, top: 60 }, null))).toBe(false);
    expect(isIntersectingViewportTop(entry({ top: 10, height: 40, bottom: 50 }, null))).toBe(true);
    expect(isIntersectingViewportTop(entry({ top: 100, height: 40, bottom: 140 }, null))).toBe(false);
  });
});
