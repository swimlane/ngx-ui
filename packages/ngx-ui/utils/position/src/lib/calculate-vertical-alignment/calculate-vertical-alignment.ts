import type { AlignmentType, Dimension } from '@swimlane/ngx-ui/types';
import { getDimension } from '../get-dimension';
import { verticalPosition } from '../vertical-position/vertical-position';

export function calculateVerticalAlignment(
  elDimensions: Dimension,
  popoverDimensions: Dimension,
  alignment: AlignmentType
): number {
  const requiredPopoverDimensions = getDimension(popoverDimensions);
  let result = verticalPosition(elDimensions, popoverDimensions, alignment);

  if (result + requiredPopoverDimensions.height > window.innerHeight) {
    result = window.innerHeight - requiredPopoverDimensions.height;
  }

  return result;
}
