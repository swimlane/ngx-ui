import { horizontalPosition } from './horizontal-position.util';
import { CARET_OFFSET } from '../caret-offset.constant';
import { AlignmentTypes } from '../alignment-types.enum';

describe('horizontalPosition', () => {
  it('should get left', () => {
    expect(horizontalPosition({ left: 10 }, {}, AlignmentTypes.left)).toEqual(10 - CARET_OFFSET);
  });

  it('should get right', () => {
    expect(horizontalPosition({ left: 10, width: 10 }, { width: 10 }, AlignmentTypes.right)).toEqual(10 + CARET_OFFSET);
  });

  it('should get center', () => {
    expect(horizontalPosition({ left: 10, width: 10 }, { width: 10 }, AlignmentTypes.center)).toEqual(10);
  });

  it('should do nothing when not horizontally aligned', () => {
    expect(horizontalPosition({ left: 10, width: 10 }, { width: 10 }, AlignmentTypes.top)).toBeUndefined();
  });
});
