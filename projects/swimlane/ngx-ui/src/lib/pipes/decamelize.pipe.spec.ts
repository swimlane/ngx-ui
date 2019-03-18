import { TestBed } from '@angular/core/testing';
import { DecamalizePipe } from './decamelize.pipe';
describe('DecamalizePipe', () => {
  let pipe: DecamalizePipe;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DecamalizePipe] });
    pipe = TestBed.get(DecamalizePipe);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('transforms DecamalizePipe to Decamalize Pipe', () => {
    const value: any = 'DecamalizePipe';
    const args: string[] = [];
    expect(pipe.transform(value)).toEqual('Decamalize Pipe');
  });
});
