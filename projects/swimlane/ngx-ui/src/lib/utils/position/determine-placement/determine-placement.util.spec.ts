import { determinePlacement } from './determine-placement.util';
import { PlacementTypes } from '../placement-type.enum';
import { AlignmentTypes } from '../alignment-types.enum';

describe('determinePlacement', () => {
  beforeEach(() => {
    vi.spyOn(window as any, 'innerWidth').mockReturnValue(0);
    vi.spyOn(window as any, 'innerHeight').mockReturnValue(0);
  });

  it('should flip placement left', () => {
    expect(
      determinePlacement(
        PlacementTypes.right,
        { left: 0, right: 0, width: 10 },
        { left: 0, right: 0, width: 100 },
        10,
        AlignmentTypes.right
      )
    ).toEqual(PlacementTypes.left);
  });

  it('should flip placement right', () => {
    expect(
      determinePlacement(
        PlacementTypes.left,
        { left: 0, right: 0, width: 10 },
        { left: 0, right: 0, width: 100 },
        10,
        AlignmentTypes.left
      )
    ).toEqual(PlacementTypes.right);
  });

  it('should flip placement top', () => {
    expect(
      determinePlacement(
        PlacementTypes.top,
        { top: 0, bottom: 0, height: 10 },
        { top: 0, bottom: 0, height: 100 },
        10,
        AlignmentTypes.top
      )
    ).toEqual(PlacementTypes.bottom);
  });

  it('should flip placement bottom', () => {
    expect(
      determinePlacement(
        PlacementTypes.bottom,
        { top: 0, bottom: 0, height: 10 },
        { top: 0, bottom: 0, height: 100 },
        10,
        AlignmentTypes.bottom
      )
    ).toEqual(PlacementTypes.top);
  });
});
