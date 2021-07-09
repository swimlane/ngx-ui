import type { Dimension } from '@swimlane/ngx-ui/typings';
import { AlignmentType } from '@swimlane/ngx-ui/typings';
import { CARET_OFFSET } from './constants';
import { getDimension } from './get-dimension';
import { verticalPosition } from './vertical-position';

export function calculateVerticalCaret(
  elDimensions: Dimension,
  popoverDimensions: Dimension,
  caretDimensions: Dimension,
  alignment: AlignmentType
): number {
  const requiredElDimensions = getDimension(elDimensions);
  const requiredPopoverDimensions = getDimension(popoverDimensions);
  const requiredCaretDimensions = getDimension(caretDimensions);

  let result = 0;

  if (alignment === AlignmentType.top) {
    result =
      requiredElDimensions.height / 2 -
      requiredCaretDimensions.height / 2 +
      CARET_OFFSET;
  }

  if (alignment === AlignmentType.bottom) {
    result =
      requiredPopoverDimensions.height -
      requiredElDimensions.height / 2 -
      requiredCaretDimensions.height / 2 -
      CARET_OFFSET;
  }

  if (alignment === AlignmentType.center) {
    result =
      requiredPopoverDimensions.height / 2 - requiredCaretDimensions.height / 2;
  }

  const popoverPosition = verticalPosition(
    requiredElDimensions,
    requiredPopoverDimensions,
    alignment
  );
  if (popoverPosition + requiredPopoverDimensions.height > window.innerHeight) {
    result +=
      popoverPosition + requiredPopoverDimensions.height - window.innerHeight;
  }

  return result;
}
