import { positionContent } from './position-content.util';
import { PlacementTypes } from '../placement-type.enum';
import { AlignmentTypes } from '../alignment-types.enum';

describe('positionContent', () => {
  it('should get when right', () => {
    const res = positionContent(
      PlacementTypes.right,
      { left: 0, height: 10, width: 10 },
      { left: 0, height: 10, width: 10 },
      0,
      AlignmentTypes.top
    );

    expect(res.left).toEqual(10);
  });

  it('should get when left', () => {
    const res = positionContent(
      PlacementTypes.left,
      { left: 0, height: 10, width: 10 },
      { left: 0, height: 10, width: 10 },
      0,
      AlignmentTypes.top
    );

    expect(res.left).toEqual(-10);
  });

  it('should get when top', () => {
    const res = positionContent(
      PlacementTypes.top,
      { top: 0, height: 10, width: 10 },
      { top: 0, height: 10, width: 10 },
      0,
      AlignmentTypes.left
    );

    expect(res.top).toEqual(-10);
  });

  it('should get when bottom', () => {
    const res = positionContent(
      PlacementTypes.bottom,
      { top: 0, height: 10, width: 10 },
      { top: 0, height: 10, width: 10 },
      0,
      AlignmentTypes.left
    );

    expect(res.top).toEqual(10);
  });
});
