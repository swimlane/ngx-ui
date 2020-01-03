import { calculateVerticalCaret } from './calculate-vertical-caret.util';
import { AlignmentTypes } from '../alignment-types.enum';
import { CARET_OFFSET } from '../caret-offset.constant';

describe('calculateVerticalCaret', () => {
  it('should get caret top alignment', () => {
    expect(calculateVerticalCaret({ height: 100 }, { height: 10 }, { height: 5 }, AlignmentTypes.top)).toEqual(
      47.5 + CARET_OFFSET
    );
  });

  it('should get caret bottom alignment', () => {
    expect(calculateVerticalCaret({ height: 100 }, { height: 10 }, { height: 5 }, AlignmentTypes.bottom)).toEqual(
      -42.5 - CARET_OFFSET
    );
  });

  it('should get caret center alignment', () => {
    expect(calculateVerticalCaret({ height: 100 }, { height: 10 }, { height: 5 }, AlignmentTypes.center)).toEqual(2.5);
  });

  it('should get caret position when window width exceeded', () => {
    spyOnProperty(window, 'innerHeight').and.returnValue(0);
    expect(
      calculateVerticalCaret({ height: 100, top: 0 }, { height: 10 }, { height: 5 }, AlignmentTypes.top)
    ).toBeGreaterThan(0);
  });
});
