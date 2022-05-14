import { TestBed } from '@angular/core/testing';

import { CamelToSnakePipe } from './camel-to-snake.pipe';

describe('CamelToSnakePipe', () => {
  let pipe: CamelToSnakePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CamelToSnakePipe] });
    pipe = TestBed.inject(CamelToSnakePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms camelToSnakePipe to camel_to_snake_pipe', () => {
    const value: any = 'camelToSnakePipe';
    expect(pipe.transform(value)).toEqual('camel_to_snake_pipe');
  });

  it('should do nothing when !input', () => {
    expect(pipe.transform()).toEqual('');
  });
});
