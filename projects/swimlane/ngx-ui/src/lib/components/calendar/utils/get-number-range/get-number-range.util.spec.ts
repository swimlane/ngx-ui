import { getNumberRange } from './get-number-range.util';

describe('getNumberRange', () => {
  it('should get range from 1 to 5', () => {
    expect(getNumberRange(1, 6)).toEqual([1, 2, 3, 4, 5]);
  });
});
