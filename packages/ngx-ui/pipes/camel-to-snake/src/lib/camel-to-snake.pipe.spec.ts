import { CamelToSnakePipe } from './camel-to-snake.pipe';

describe('CamelToSnakePipe', () => {
  it('create an instance', () => {
    const pipe = new CamelToSnakePipe();
    expect(pipe).toBeTruthy();
  });
});
