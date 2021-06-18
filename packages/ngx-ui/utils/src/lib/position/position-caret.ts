import type { AlignmentType, Dimension } from '@swimlane/ngx-ui/typings';
import { PlacementType } from '@swimlane/ngx-ui/typings';
import { calculateHorizontalCaret } from './calculate-horizontal-caret';
import { calculateVerticalCaret } from './calculate-vertical-caret';
import { CARET_OFFSET } from './constants';
import { getDimension } from './get-dimension';

export function positionCaret(
  placement: PlacementType,
  elmDim: Dimension,
  hostDim: Dimension,
  caretDimensions: Dimension,
  alignment: AlignmentType
) {
  const requiredElmDim = getDimension(elmDim);
  const offset = -1 * CARET_OFFSET;

  let top: number;
  let left: number;

  if (placement === PlacementType.right) {
    left = offset;
    top = calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
  } else if (placement === PlacementType.left) {
    left = requiredElmDim.width - 1;
    top = calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
  } else if (placement === PlacementType.top) {
    top = requiredElmDim.height - 1;
    left = calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
  } else {
    top = offset;
    left = calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
  }

  return { top, left };
}
