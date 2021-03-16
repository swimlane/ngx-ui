import type { Dimension } from '@swimlane/ngx-ui/types';
import { AlignmentType } from '@swimlane/ngx-ui/types';
import { CARET_OFFSET } from '../constants';
import { getDimension } from '../get-dimension';

export function verticalPosition(
  elDimensions: Dimension,
  popoverDimensions: Dimension,
  alignment: AlignmentType
): number {
  const requiredElDimensions = getDimension(elDimensions);
  const requiredPopoverDimensions = getDimension(popoverDimensions);

  let result = 0;

  if (alignment === AlignmentType.top) {
    result = requiredElDimensions.top - CARET_OFFSET;
  }

  if (alignment === AlignmentType.bottom) {
    result = requiredElDimensions.top + requiredElDimensions.height - requiredPopoverDimensions.height + CARET_OFFSET;
  }

  if (alignment === AlignmentType.center) {
    result = requiredElDimensions.top + requiredElDimensions.height / 2 - requiredPopoverDimensions.height / 2;
  }

  return result;
}
