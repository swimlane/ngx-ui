import type { Dimension } from '@swimlane/ngx-ui/typings';
import { AlignmentType } from '@swimlane/ngx-ui/typings';
import { CARET_OFFSET } from './constants';
import { getDimension } from './get-dimension';
import { horizontalPosition } from './horizontal-position';

export function calculateHorizontalCaret(
  elDimensions: Dimension,
  popoverDimensions: Dimension,
  caretDimensions: Dimension,
  alignment: AlignmentType
): number {
  const requiredElDimensions = getDimension(elDimensions);
  const requiredPopoverDimensions = getDimension(popoverDimensions);
  const requiredCaretDimensions = getDimension(caretDimensions);

  let result = 0;

  if (alignment === AlignmentType.left) {
    result =
      requiredElDimensions.width / 2 -
      requiredCaretDimensions.width / 2 +
      CARET_OFFSET;
  }

  if (alignment === AlignmentType.right) {
    result =
      requiredPopoverDimensions.width -
      requiredElDimensions.width / 2 -
      requiredCaretDimensions.width / 2 -
      CARET_OFFSET;
  }

  if (alignment === AlignmentType.center) {
    result =
      requiredPopoverDimensions.width / 2 - requiredCaretDimensions.width / 2;
  }

  const popoverPosition = horizontalPosition(
    requiredElDimensions,
    requiredPopoverDimensions,
    alignment
  );
  if (popoverPosition + requiredPopoverDimensions.width > window.innerWidth) {
    result +=
      popoverPosition + requiredPopoverDimensions.width - window.innerWidth;
  }

  return result;
}
