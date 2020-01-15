import { basisToValue } from './basis-to-value.util';

describe('basisToValue', () => {
  it('should parse number from % string', () => {
    expect(basisToValue('100%')).toEqual(100);
  });

  it('should parse number from px string', () => {
    expect(basisToValue('100px')).toEqual(100);
  });

  it('should return original number', () => {
    expect(basisToValue(100)).toEqual(100);
  });
});
