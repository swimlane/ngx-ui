import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { CARET_OFFSET } from '../caret-offset.constant';
import { verticalPosition } from '../vertical-position';

/**
 * Calculate vertical caret position
 *
 * @param elDimensions
 * @param popoverDimensions
 * @param caretDimensions
 * @param alignment
 *
 * @memberOf PositionHelper
 */
export function calculateVerticalCaret(
  elDimensions: Dimensions,
  popoverDimensions: Dimensions,
  caretDimensions: Dimensions,
  alignment: AlignmentTypes
): number {
  let result: number;

  if (alignment === AlignmentTypes.top) {
    result = elDimensions.height / 2 - caretDimensions.height / 2 + CARET_OFFSET;
  }

  if (alignment === AlignmentTypes.bottom) {
    result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - CARET_OFFSET;
  }

  if (alignment === AlignmentTypes.center) {
    result = popoverDimensions.height / 2 - caretDimensions.height / 2;
  }

  const popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
  if (popoverPosition + popoverDimensions.height > window.innerHeight) {
    result += popoverPosition + popoverDimensions.height - window.innerHeight;
  }

  return result;
}
