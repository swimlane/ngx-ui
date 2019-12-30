import { resizeAreaBy } from './resize-area-by.util';
import { SplitAreaDirective } from './split-area.directive';

describe('resizeAreaBy', () => {
  let splitArea: SplitAreaDirective;

  beforeEach(() => {
    splitArea = {
      fxFlex: '1 1 50px',
      currentFlexBasis: ['1', '1', '50px'],
      initialFlexBasis: ['1', '1', '50px'],
      minBasis: '',
      maxBasis: '',
      updateStyle: () => undefined
    } as any;
  });

  it('should get new area size px', () => {
    const size = resizeAreaBy(splitArea, 10, 50);
    expect(size).toEqual(10);
  });

  it('should get new area size percentage', () => {
    splitArea = {
      fxFlex: '1 1 50%',
      currentFlexBasis: ['1', '1', '50%'],
      initialFlexBasis: ['1', '1', '50%'],
      minBasis: '',
      maxBasis: '',
      updateStyle: () => undefined
    } as any;

    const size = resizeAreaBy(splitArea, 10, 50);
    expect(size).toEqual(10);
  });

  it('should do nothing if fxFlexFill provided', () => {
    const size = resizeAreaBy({
      fxFlexFill: true
    } as any, 10, 50);

    expect(size).toEqual(10);
  });
});
