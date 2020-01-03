import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { horizontalPosition } from '../horizontal-position';
import { PlacementTypes } from '../placement-type.enum';
import { verticalPosition } from '../vertical-position';

/**
 * Checks if the element's position should be flipped
 *
 * @param elDimensions
 * @param popoverDimensions
 * @param placement
 * @param alignment
 * @param spacing
 *
 * @memberOf PositionHelper
 */
export function shouldFlip(elDimensions: Dimensions, popoverDimensions: Dimensions, placement: PlacementTypes, alignment: AlignmentTypes, spacing: number): boolean {
  let flip = false;

  if (placement === PlacementTypes.right) {
    const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
    if (popoverPosition + popoverDimensions.width + spacing > window.innerWidth) {
      flip = true;
    }
  }

  if (placement === PlacementTypes.left) {
    const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
    if (popoverPosition - spacing < 0) {
      flip = true;
    }
  }

  if (placement === PlacementTypes.top) {
    if (elDimensions.top - popoverDimensions.height - spacing < 0) {
      flip = true;
    }
  }

  if (placement === PlacementTypes.bottom) {
    const popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
    if (popoverPosition + popoverDimensions.height + spacing > window.innerHeight) {
      flip = true;
    }
  }

  return flip;
}
