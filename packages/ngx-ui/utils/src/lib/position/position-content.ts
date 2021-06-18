import type { AlignmentType, Dimension } from '@swimlane/ngx-ui/typings';
import { PlacementType } from '@swimlane/ngx-ui/typings';
import { calculateHorizontalAlignment } from './calculate-horizontal-alignment';
import { calculateVerticalAlignment } from './calculate-vertical-alignment';
import { getDimension } from './get-dimension';

export function positionContent(
  placement: PlacementType,
  elmDim: Dimension,
  hostDim: Dimension,
  spacing: number,
  alignment: AlignmentType
) {
  const requiredHostDim = getDimension(hostDim);
  const requiredElmDim = getDimension(elmDim);

  let top: number;
  let left: number;

  if (placement === PlacementType.right) {
    left = requiredHostDim.left + requiredHostDim.width + spacing;
    top = calculateVerticalAlignment(hostDim, elmDim, alignment);
  } else if (placement === PlacementType.left) {
    left = requiredHostDim.left - requiredElmDim.width - spacing;
    top = calculateVerticalAlignment(hostDim, elmDim, alignment);
  } else if (placement === PlacementType.top) {
    top = requiredHostDim.top - requiredElmDim.height - spacing;
    left = calculateHorizontalAlignment(hostDim, elmDim, alignment);
  } else {
    top = requiredHostDim.top + requiredHostDim.height + spacing;
    left = calculateHorizontalAlignment(hostDim, elmDim, alignment);
  }

  return { top, left };
}
