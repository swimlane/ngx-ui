import { isPercent } from './is-percent.util';

describe('isPercent', () => {
  it('should be true', () => {
    expect(isPercent('10%')).toBeTruthy();
  });

  it('should be false', () => {
    expect(isPercent('10px')).toBeFalsy();
  });
});
