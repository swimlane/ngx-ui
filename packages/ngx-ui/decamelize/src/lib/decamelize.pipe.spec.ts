import { DecamelizePipe } from './decamelize.pipe';

describe('DecamelizePipe', () => {
  it('create an instance', () => {
    const pipe = new DecamelizePipe();
    expect(pipe).toBeTruthy();
  });
});
