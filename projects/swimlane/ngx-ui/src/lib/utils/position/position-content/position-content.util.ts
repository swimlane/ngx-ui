import { PlacementTypes } from '../placement-type.enum';
import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { calculateVerticalAlignment } from '../calculate-vertical-alignment';
import { calculateHorizontalAlignment } from '../calculate-horizontal-alignment';

/**
 * Position content
 *
 * @param placement
 * @param elmDim
 * @param hostDim
 * @param spacing
 * @param alignment
 *
 * @memberOf PositionHelper
 */
export function positionContent(placement: PlacementTypes, elmDim: Dimensions, hostDim: Dimensions, spacing: number, alignment: AlignmentTypes) {
  let top = 0;
  let left = 0;

  if (placement === PlacementTypes.right) {
    left = hostDim.left + hostDim.width + spacing;
    top = calculateVerticalAlignment(hostDim, elmDim, alignment);
  } else if (placement === PlacementTypes.left) {
    left = hostDim.left - elmDim.width - spacing;
    top = calculateVerticalAlignment(hostDim, elmDim, alignment);
  } else if (placement === PlacementTypes.top) {
    top = hostDim.top - elmDim.height - spacing;
    left = calculateHorizontalAlignment(hostDim, elmDim, alignment);
  } else if (placement === PlacementTypes.bottom) {
    top = hostDim.top + hostDim.height + spacing;
    left = calculateHorizontalAlignment(hostDim, elmDim, alignment);
  }

  return { top, left };
}
