import { DecamelizePipe } from './decamelize.pipe';

describe('DecamelizePipe', () => {
  let pipe: DecamelizePipe;

  beforeEach(() => {
    pipe = new DecamelizePipe();
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms DecamelizePipe to Decamelize Pipe', () => {
    const value: any = 'DecamelizePipe';
    expect(pipe.transform(value)).toEqual('Decamelize Pipe');
  });

  it('should do nothing if !input', () => {
    expect(pipe.transform(undefined)).toEqual('');
  });
});
