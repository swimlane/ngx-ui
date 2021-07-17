import { SplitAreaDirective } from '../directives';
import { resizeAreaBy } from './resize-area-by.util';

describe(resizeAreaBy.name, () => {
  let splitArea: SplitAreaDirective;

  beforeEach(() => {
    splitArea = {
      currentFlexParts: ['1', '1', '50px'],
      initialFlexParts: ['1', '1', '50px'],
      minBasis: '',
      maxBasis: '',
      updateBasis: () => undefined,
    } as any;
  });

  it('should get new area size px', () => {
    const size = resizeAreaBy(splitArea, 10, 50);
    expect(size).toEqual(10);
  });

  it('should get new area size percentage', () => {
    splitArea = {
      currentFlexParts: ['1', '1', '50%'],
      initialFlexParts: ['1', '1', '50%'],
      minBasis: '',
      maxBasis: '',
      updateBasis: () => undefined,
    } as any;

    const size = resizeAreaBy(splitArea, 10, 50);
    expect(size).toEqual(10);
  });
});
