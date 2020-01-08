import { convertClass } from './convert-class.util';

describe('convertClass', () => {
  it('should convert class', () => {
    expect(convertClass('svg:test')).toEqual('ngx-icon svg svg-test');
  });

  it('should convert class when incorrectly formatted', () => {
    expect(convertClass(':test')).toEqual('ngx-icon test');
  });
});

