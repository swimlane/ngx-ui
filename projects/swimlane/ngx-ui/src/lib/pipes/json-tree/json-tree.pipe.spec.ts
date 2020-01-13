import { JSONTreePipe } from './json-tree.pipe';

describe('JSONTreePipe', () => {
  let pipe: JSONTreePipe;

  beforeEach(() => {
    pipe = new JSONTreePipe();
  });

  it('should tranform', () => {
    expect(pipe.transform(null).length).toEqual(1);
  });
});
