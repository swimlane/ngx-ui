import type { AlignmentType, Dimension } from '@swimlane/ngx-ui/typings';
import { PlacementType } from '@swimlane/ngx-ui/typings';
import { shouldFlip } from './should-flip';

export function determinePlacement(
  placement: PlacementType,
  elmDim: Dimension,
  hostDim: Dimension,
  spacing: number,
  alignment: AlignmentType
) {
  const flip = shouldFlip(hostDim, elmDim, placement, alignment, spacing);

  if (flip) {
    if (placement === PlacementType.right) {
      return PlacementType.left;
    }
    if (placement === PlacementType.left) {
      return PlacementType.right;
    }
    if (placement === PlacementType.top) {
      return PlacementType.bottom;
    }
    return PlacementType.top;
  }

  return placement;
}
