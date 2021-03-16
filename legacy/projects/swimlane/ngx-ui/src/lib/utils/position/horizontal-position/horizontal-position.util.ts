import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { CARET_OFFSET } from '../caret-offset.constant';

export function horizontalPosition(elDimensions: Dimensions, popoverDimensions: Dimensions, alignment: AlignmentTypes) {
  if (alignment === AlignmentTypes.left) {
    return elDimensions.left - CARET_OFFSET;
  }

  if (alignment === AlignmentTypes.right) {
    return elDimensions.left + elDimensions.width - popoverDimensions.width + CARET_OFFSET;
  }

  if (alignment === AlignmentTypes.center) {
    return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
  }
}
