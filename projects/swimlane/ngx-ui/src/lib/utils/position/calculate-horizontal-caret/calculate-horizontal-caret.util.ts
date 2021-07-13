import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { CARET_OFFSET } from '../caret-offset.constant';
import { horizontalPosition } from '../horizontal-position/horizontal-position.util';

/**
 * Calculate horz caret position
 *
 * @param elDimensions
 * @param popoverDimensions
 * @param caretDimensions
 * @param alignment
 *
 * @returns number
 */
export const calculateHorizontalCaret = (
  elDimensions: Dimensions,
  popoverDimensions: Dimensions,
  caretDimensions: Dimensions,
  alignment: AlignmentTypes
): number => {
  let result: number;

  if (alignment === AlignmentTypes.left) {
    result = elDimensions.width / 2 - caretDimensions.width / 2 + CARET_OFFSET;
  }

  if (alignment === AlignmentTypes.right) {
    result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - CARET_OFFSET;
  }

  if (alignment === AlignmentTypes.center) {
    result = popoverDimensions.width / 2 - caretDimensions.width / 2;
  }

  const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
  if (popoverPosition + popoverDimensions.width > window.innerWidth) {
    result += popoverPosition + popoverDimensions.width - window.innerWidth;
  }

  return result;
};
