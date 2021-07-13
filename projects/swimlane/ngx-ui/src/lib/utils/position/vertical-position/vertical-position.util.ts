import { Dimensions } from '../dimensions.interface';
import { AlignmentTypes } from '../alignment-types.enum';
import { CARET_OFFSET } from '../caret-offset.constant';

export const verticalPosition = (
  elDimensions: Dimensions,
  popoverDimensions: Dimensions,
  alignment: AlignmentTypes
): number => {
  let result: number;

  if (alignment === AlignmentTypes.top) {
    result = elDimensions.top - CARET_OFFSET;
  }

  if (alignment === AlignmentTypes.bottom) {
    result = elDimensions.top + elDimensions.height - popoverDimensions.height + CARET_OFFSET;
  }

  if (alignment === AlignmentTypes.center) {
    result = elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
  }

  return result;
};
