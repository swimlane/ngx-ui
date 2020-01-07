import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should filter by string', () => {
    expect(pipe.transform(['test', 'blur'], 'test').length).toEqual(1);
  });

  it('should filter by number', () => {
    expect(pipe.transform([1, 2], 1).length).toEqual(1);
  });

  it('should filter by string number', () => {
    expect(pipe.transform(['test', 'blur', '1'], '1').length).toEqual(1);
  });

  it('should filter by object', () => {
    expect(pipe.transform([{ }, { test: 'test' }], { test: 'test' }).length).toEqual(1);
  });
});
