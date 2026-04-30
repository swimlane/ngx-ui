import { afterEach } from 'vitest';

import { calculateHorizontalAlignment } from './calculate-horizontal-alignment.util';
import { AlignmentTypes } from '../alignment-types.enum';

describe('calculateHorizontalAlignment', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should get horizontal alignment', () => {
    expect(
      calculateHorizontalAlignment(
        { height: 10, width: 10, left: 0 },
        { height: 10, width: 10, left: 0 },
        AlignmentTypes.right
      )
    ).toBeGreaterThan(0);
  });

  it('should get horizontal alignment when width exceeds window width', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(10);
    expect(
      calculateHorizontalAlignment(
        { height: 10, width: 10, left: 0 },
        { height: 10, width: 10, left: 0 },
        AlignmentTypes.right
      )
    ).toEqual(0);
  });
});
