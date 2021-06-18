import type { Dimension } from '@swimlane/ngx-ui/typings';

export function getDimension(partial: Partial<Dimension>): Required<Dimension> {
  const { width = 0, bottom = 0, height = 0, left = 0, right = 0, top = 0 } = partial;
  return { width, bottom, height, left, right, top };
}
