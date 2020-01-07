import { isNumber } from './is-number.util';

describe('isNumber', () => {
  it('should not be number', () => {
    expect(isNumber('test')).toBeFalsy();
  });

  it('should be number', () => {
    expect(isNumber('1')).toBeTruthy();
  });
});
