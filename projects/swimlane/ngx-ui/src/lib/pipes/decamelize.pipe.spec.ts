import { TestBed } from '@angular/core/testing';
import { DecamelizePipe } from './decamelize.pipe';
describe('DecamelizePipe', () => {
  let pipe: DecamelizePipe;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DecamelizePipe] });
    pipe = TestBed.get(DecamelizePipe);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('transforms DecamelizePipe to Decamelize Pipe', () => {
    const value: any = 'DecamelizePipe';
    const args: string[] = [];
    expect(pipe.transform(value)).toEqual('Decamelize Pipe');
  });
});
