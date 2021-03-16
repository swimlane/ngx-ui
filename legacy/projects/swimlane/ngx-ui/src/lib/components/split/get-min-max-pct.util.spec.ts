import { getMinMaxPct } from './get-min-max-pct.util';

describe('getMinMaxPct', () => {
  it('should get min and max with px basis', () => {
    const res = getMinMaxPct('0px', '0px', '0', '0', 0, 0);
    expect(res.length).toEqual(2);
  });

  it('should get min and max with % basis', () => {
    const res = getMinMaxPct('10%', '10%', '1', '1', 10, 10);
    expect(res.length).toEqual(2);
  });
});
