import type { Dimension } from '@swimlane/ngx-ui/typings';
import { AlignmentType } from '@swimlane/ngx-ui/typings';
import { CARET_OFFSET } from './constants';
import { getDimension } from './get-dimension';

export function horizontalPosition(elDimensions: Dimension, popoverDimensions: Dimension, alignment: AlignmentType) {
  const requiredElDimensions = getDimension(elDimensions);
  const requiredPopoverDimensions = getDimension(popoverDimensions);

  if (alignment === AlignmentType.left) {
    return requiredElDimensions.left - CARET_OFFSET;
  }

  if (alignment === AlignmentType.right) {
    return requiredElDimensions.left + requiredElDimensions.width - requiredPopoverDimensions.width + CARET_OFFSET;
  }

  if (alignment === AlignmentType.center) {
    return requiredElDimensions.left + requiredElDimensions.width / 2 - requiredPopoverDimensions.width / 2;
  }

  return 0;
}
