import { calculateVerticalAlignment } from './calculate-vertical-alignment.util';
import { AlignmentTypes } from '../alignment-types.enum';

describe('calculateVerticalAlignment', () => {
  it('should get horizontal alignment', () => {
    expect(
      calculateVerticalAlignment(
        { height: 10, width: 10, top: 0 },
        { height: 10, width: 10, top: 0 },
        AlignmentTypes.top
      )
    ).toEqual(-7);
  });

  it('should get horizontal alignment when width exceeds window width', () => {
    vi.spyOn(window as any, 'innerHeight').mockReturnValue(10);
    expect(
      calculateVerticalAlignment(
        { height: 10, width: 10, top: 0 },
        { height: 50, width: 10, top: 0 },
        AlignmentTypes.top
      )
    ).toEqual(-40);
  });
});
