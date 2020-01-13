import { positionCaret } from './position-caret.util';
import { PlacementTypes } from '../placement-type.enum';
import { AlignmentTypes } from '../alignment-types.enum';
import { CARET_OFFSET } from '../caret-offset.constant';

describe('positionCaret', () => {
  it('should get caret when right', () => {
    const res = positionCaret(
      PlacementTypes.right,
      { height: 10, width: 10 },
      { height: 10, width: 10 },
      { height: 10, width: 10 },
      AlignmentTypes.top
    );

    expect(res.left).toEqual(-1 * CARET_OFFSET);
  });

  it('should get caret when left', () => {
    const res = positionCaret(
      PlacementTypes.left,
      { height: 10, width: 10 },
      { height: 10, width: 10 },
      { height: 10, width: 10 },
      AlignmentTypes.top
    );

    expect(res.left).toEqual(10);
  });

  it('should get caret when top', () => {
    const res = positionCaret(
      PlacementTypes.top,
      { height: 10, width: 10 },
      { height: 10, width: 10 },
      { height: 10, width: 10 },
      AlignmentTypes.left
    );

    expect(res.top).toEqual(10);
  });

  it('should get caret when bottom', () => {
    const res = positionCaret(
      PlacementTypes.bottom,
      { height: 10, width: 10 },
      { height: 10, width: 10 },
      { height: 10, width: 10 },
      AlignmentTypes.left
    );

    expect(res.top).toEqual(-1 * CARET_OFFSET);
  });
});
