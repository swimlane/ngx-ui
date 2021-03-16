import type { AlignmentType, Dimension } from '@swimlane/ngx-ui/types';
import { PlacementType } from '@swimlane/ngx-ui/types';
import { getDimension } from '../get-dimension';
import { horizontalPosition } from '../horizontal-position/horizontal-position';
import { verticalPosition } from '../vertical-position/vertical-position';

export function shouldFlip(
  elDimensions: Dimension,
  popoverDimensions: Dimension,
  placement: PlacementType,
  alignment: AlignmentType,
  spacing: number
): boolean {
  const requiredPopoverDimensions = getDimension(popoverDimensions);
  const requiredElDimensions = getDimension(elDimensions);

  let flip = false;

  if (placement === PlacementType.right) {
    const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
    if (popoverPosition + requiredPopoverDimensions.width + spacing > window.innerWidth) {
      flip = true;
    }
  }

  if (placement === PlacementType.left) {
    const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
    if (popoverPosition - spacing < 0) {
      flip = true;
    }
  }

  if (placement === PlacementType.top) {
    if (requiredElDimensions.top - requiredPopoverDimensions.height - spacing < 0) {
      flip = true;
    }
  }

  if (placement === PlacementType.bottom) {
    const popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
    if (popoverPosition + requiredPopoverDimensions.height + spacing > window.innerHeight) {
      flip = true;
    }
  }

  return flip;
}
