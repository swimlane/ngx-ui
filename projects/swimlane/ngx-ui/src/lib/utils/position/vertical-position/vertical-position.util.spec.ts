import { verticalPosition } from './vertical-position.util';
import { CARET_OFFSET } from '../caret-offset.constant';
import { AlignmentTypes } from '../alignment-types.enum';

describe('verticalPosition', () => {
  it('should get top', () => {
    expect(verticalPosition(
      { top: 10 },
      { },
      AlignmentTypes.top
    )).toEqual(10 - CARET_OFFSET);
  });

  it('should get bottom', () => {
    expect(verticalPosition(
      { top: 10, height: 10 },
      { height: 10 },
      AlignmentTypes.bottom
    )).toEqual(10 + CARET_OFFSET);
  });

  it('should get center', () => {
    expect(verticalPosition(
      { top: 10, height: 10 },
      { height: 10 },
      AlignmentTypes.center
    )).toEqual(10);
  });

  it('should do nothing when not vertically aligned', () => {
    expect(verticalPosition(
      { top: 10, height: 10 },
      { height: 10 },
      AlignmentTypes.left
    )).toBeUndefined();
  });
});
