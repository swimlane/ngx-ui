import type { AlignmentType, Dimension } from '@swimlane/ngx-ui/types';
import { getDimension } from '../get-dimension';
import { horizontalPosition } from '../horizontal-position/horizontal-position';

export function calculateHorizontalAlignment(
  elDimensions: Dimension,
  popoverDimensions: Dimension,
  alignment: AlignmentType
): number {
  const requiredPopoverDimensions = getDimension(popoverDimensions);

  let result = horizontalPosition(elDimensions, popoverDimensions, alignment);

  if (result + requiredPopoverDimensions.width > window.innerWidth) {
    result = window.innerWidth - requiredPopoverDimensions.width;
  }

  return result;
}
