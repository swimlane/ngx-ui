import { getType } from './get-type.util';

describe('getType', () => {
  it('should get var type when array', () => {
    expect(getType([])).toEqual('array');
  });

  it('should get var type when not array', () => {
    expect(getType(1)).toEqual('number');
  });

  it('should be null', () => {
    expect(getType(null)).toEqual('null');
  });
});
