import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { horizontalPosition } from '../horizontal-position';

/**
 * Calculate horz alignment position
 *
 * @param elDimensions
 * @param popoverDimensions
 * @param alignment
 *
 * @returns number
 */
export function calculateHorizontalAlignment(elDimensions: Dimensions, popoverDimensions: Dimensions, alignment: AlignmentTypes): number {
  let result = horizontalPosition(elDimensions, popoverDimensions, alignment);

  if (result + popoverDimensions.width > window.innerWidth) {
    result = window.innerWidth - popoverDimensions.width;
  }

  return result;
}
