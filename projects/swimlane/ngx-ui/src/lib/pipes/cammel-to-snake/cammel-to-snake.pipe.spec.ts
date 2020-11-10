import { TestBed } from '@angular/core/testing';

import { CammelToSnakePipe } from './cammel-to-snake.pipe';

describe('CammelToSnakePipe', () => {
  let pipe: CammelToSnakePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CammelToSnakePipe] });
    pipe = TestBed.inject(CammelToSnakePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms cammelToSnakePipe to cammel_to_snake_pipe', () => {
    const value: any = 'cammelToSnakePipe';
    expect(pipe.transform(value)).toEqual('cammel_to_snake_pipe');
  });

  it('should do nothing when !input', () => {
    expect(pipe.transform()).toEqual('');
  });
});
