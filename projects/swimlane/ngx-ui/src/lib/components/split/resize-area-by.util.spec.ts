import { resizeAreaBy } from './resize-area-by.util';
import { SplitAreaDirective } from './split-area.directive';

describe('resizeAreaBy', () => {
  let splitArea: SplitAreaDirective;

  beforeEach(() => {
    splitArea = {
      fxFlex: '1 1 50px',
      currentFlexParts: ['1', '1', '50px'],
      initialFlexParts: ['1', '1', '50px'],
      minBasis: '',
      maxBasis: '',
      updateBasis: () => undefined
    } as any;
  });

  it('should get new area size px', () => {
    const size = resizeAreaBy(splitArea, 10, 50);
    expect(size).toEqual(10);
  });

  it('should get new area size percentage', () => {
    splitArea = {
      fxFlex: '1 1 50%',
      currentFlexParts: ['1', '1', '50%'],
      initialFlexParts: ['1', '1', '50%'],
      minBasis: '',
      maxBasis: '',
      updateBasis: () => undefined
    } as any;

    const size = resizeAreaBy(splitArea, 10, 50);
    expect(size).toEqual(10);
  });
});
