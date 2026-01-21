import { calculateHorizontalCaret } from './calculate-horizontal-caret.util';
import { AlignmentTypes } from '../alignment-types.enum';
import { CARET_OFFSET } from '../caret-offset.constant';

describe('calculateHorizontalCaret', () => {
  it('should get caret left alignment', () => {
    expect(calculateHorizontalCaret({ width: 100 }, { width: 10 }, { width: 5 }, AlignmentTypes.left)).toEqual(
      47.5 + CARET_OFFSET
    );
  });

  it('should get caret right alignment', () => {
    expect(calculateHorizontalCaret({ width: 100 }, { width: 10 }, { width: 5 }, AlignmentTypes.right)).toEqual(
      -42.5 - CARET_OFFSET
    );
  });

  it('should get caret center alignment', () => {
    expect(calculateHorizontalCaret({ width: 100 }, { width: 10 }, { width: 5 }, AlignmentTypes.center)).toEqual(2.5);
  });

  it('should get caret position when window width exceeded', () => {
    vi.spyOn(window as any, 'innerWidth').mockReturnValue(0);
    expect(
      calculateHorizontalCaret({ width: 100, left: 0 }, { width: 10 }, { width: 5 }, AlignmentTypes.left)
    ).toBeGreaterThan(0);
  });
});
