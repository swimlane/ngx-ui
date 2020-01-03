import { PlacementTypes } from '../placement-type.enum';
import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { calculateVerticalCaret } from '../calculate-vertical-caret';
import { calculateHorizontalCaret } from '../calculate-horizontal-caret';

/**
 * Position caret
 *
 * @param placement
 * @param elmDim
 * @param hostDim
 * @param caretDimensions
 * @param alignment
 *
 * @memberOf PositionHelper
 */
export function positionCaret(
  placement: PlacementTypes,
  elmDim: Dimensions,
  hostDim: Dimensions,
  caretDimensions: Dimensions,
  alignment: AlignmentTypes
) {
  let top = 0;
  let left = 0;

  if (placement === PlacementTypes.right) {
    left = -7;
    top = calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
  } else if (placement === PlacementTypes.left) {
    left = elmDim.width;
    top = calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
  } else if (placement === PlacementTypes.top) {
    top = elmDim.height;
    left = calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
  } else if (placement === PlacementTypes.bottom) {
    top = -7;
    left = calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
  }

  return { top, left };
}
