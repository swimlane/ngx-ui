import { PlacementTypes } from '../placement-type.enum';
import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { calculateVerticalCaret } from '../calculate-vertical-caret';
import { calculateHorizontalCaret } from '../calculate-horizontal-caret';
import { CARET_OFFSET } from '../caret-offset.constant';

/**
 * Position caret
 *
 * @param placement
 * @param elmDim
 * @param hostDim
 * @param caretDimensions
 * @param alignment
 *
 * @returns ({ top: number; left: number; })
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
    left = -1 * CARET_OFFSET;
    top = calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
  } else if (placement === PlacementTypes.left) {
    left = elmDim.width;
    top = calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
  } else if (placement === PlacementTypes.top) {
    top = elmDim.height;
    left = calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
  } else {
    top = -1 * CARET_OFFSET;
    left = calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
  }

  return { top, left };
}
