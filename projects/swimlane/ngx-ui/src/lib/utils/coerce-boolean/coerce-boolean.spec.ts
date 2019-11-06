import { coerceBoolean } from './coerce-boolean';

describe('coerceBoolean', () => {
  it('should be true', () => {
    expect(coerceBoolean('true')).toBe(true);
  });

  it('should be false', () => {
    expect(coerceBoolean('false')).toBe(false);
  });
});
