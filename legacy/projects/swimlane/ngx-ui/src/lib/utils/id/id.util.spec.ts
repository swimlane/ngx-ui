import { id } from './id.util';

describe('id', () => {
  it('should generate new 5 digit id', () => {
    expect(id().length).toEqual(5);
  });
});
