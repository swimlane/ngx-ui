import { shouldFlip } from './should-flip.util';
import { PlacementTypes } from '../placement-type.enum';
import { AlignmentTypes } from '../alignment-types.enum';

describe('shouldFlip', () => {
  describe('left', () => {
    it('should flip placement left', () => {
      vi.spyOn(window as any, 'innerWidth').mockReturnValue(0);
      expect(
        shouldFlip(
          { left: 0, right: 0, width: 10 },
          { left: 0, right: 0, width: 100 },
          PlacementTypes.right,
          AlignmentTypes.right,
          10
        )
      ).toBeTruthy();
    });

    it('should not flip placement left', () => {
      expect(
        shouldFlip(
          { left: 0, right: 0, width: 10 },
          { left: 0, right: 0, width: 10 },
          PlacementTypes.right,
          AlignmentTypes.right,
          0
        )
      ).toBeFalsy();
    });
  });

  describe('right', () => {
    it('should flip placement right', () => {
      vi.spyOn(window as any, 'innerWidth').mockReturnValue(0);
      expect(
        shouldFlip(
          { left: 0, right: 0, width: 10 },
          { left: 0, right: 0, width: 100 },
          PlacementTypes.left,
          AlignmentTypes.left,
          10
        )
      ).toBeTruthy();
    });

    it('should not flip placement right', () => {
      expect(
        shouldFlip(
          { left: 0, right: 0, width: 10 },
          { left: 0, right: 0, width: 10 },
          PlacementTypes.left,
          AlignmentTypes.right,
          0
        )
      ).toBeFalsy();
    });
  });

  describe('top', () => {
    it('should flip placement top', () => {
      vi.spyOn(window as any, 'innerHeight').mockReturnValue(0);
      expect(
        shouldFlip(
          { top: 0, bottom: 0, height: 10 },
          { top: 0, bottom: 0, height: 100 },
          PlacementTypes.top,
          AlignmentTypes.top,
          10
        )
      ).toBeTruthy();
    });

    it('should not flip placement top', () => {
      expect(
        shouldFlip(
          { top: 20, bottom: 0, height: 10 },
          { top: 0, bottom: 0, height: 10 },
          PlacementTypes.top,
          AlignmentTypes.top,
          0
        )
      ).toBeFalsy();
    });
  });

  describe('bottom', () => {
    it('should flip placement bottom', () => {
      vi.spyOn(window as any, 'innerHeight').mockReturnValue(0);
      expect(
        shouldFlip(
          { top: 0, bottom: 0, height: 10 },
          { top: 0, bottom: 0, height: 100 },
          PlacementTypes.bottom,
          AlignmentTypes.bottom,
          10
        )
      ).toBeTruthy();
    });

    it('should not flip placement bottom', () => {
      expect(
        shouldFlip(
          { top: 10, bottom: 0, height: 10 },
          { top: 0, bottom: 0, height: 10 },
          PlacementTypes.bottom,
          AlignmentTypes.top,
          0
        )
      ).toBeFalsy();
    });
  });
});
