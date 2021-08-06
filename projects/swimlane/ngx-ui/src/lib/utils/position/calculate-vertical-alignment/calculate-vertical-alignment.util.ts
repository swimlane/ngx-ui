import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { verticalPosition } from '../vertical-position/vertical-position.util';

/**
 * Calculate vertical alignment position
 *
 * @param elDimensions
 * @param popoverDimensions
 * @param alignment
 *
 * @memberOf PositionHelper
 */
export const calculateVerticalAlignment = (
  elDimensions: Dimensions,
  popoverDimensions: Dimensions,
  alignment: AlignmentTypes
): number => {
  let result = verticalPosition(elDimensions, popoverDimensions, alignment);

  if (result + popoverDimensions.height > window.innerHeight) {
    result = window.innerHeight - popoverDimensions.height;
  }

  return result;
};
