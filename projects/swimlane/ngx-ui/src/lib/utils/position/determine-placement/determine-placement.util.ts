import { PlacementTypes } from '../placement-type.enum';
import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { shouldFlip } from '../should-flip/should-flip.util';

/**
 * Determine placement based on flip
 *
 * @param placement
 * @param elmDim
 * @param hostDim
 * @param spacing
 * @param alignment
 *
 * @returns PlacementTypes
 */
export const determinePlacement = (
  placement: PlacementTypes,
  elmDim: Dimensions,
  hostDim: Dimensions,
  spacing: number,
  alignment: AlignmentTypes
): PlacementTypes => {
  const flip = shouldFlip(hostDim, elmDim, placement, alignment, spacing);

  if (flip) {
    if (placement === PlacementTypes.right) {
      return PlacementTypes.left;
    } else if (placement === PlacementTypes.left) {
      return PlacementTypes.right;
    } else if (placement === PlacementTypes.top) {
      return PlacementTypes.bottom;
    } else {
      return PlacementTypes.top;
    }
  }

  return placement;
};
