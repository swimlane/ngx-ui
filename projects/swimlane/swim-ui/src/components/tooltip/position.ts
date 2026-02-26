/**
 * Position utilities for tooltip/popover placement.
 * Mirrors @swimlane/ngx-ui position logic.
 */

import { PlacementType } from './placement-type.enum';
import { AlignmentType } from './alignment-type.enum';

export interface Dimensions {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  height?: number;
  width?: number;
}

const CARET_OFFSET = 7;

function horizontalPosition(hostDim: Dimensions, elmDim: Dimensions, alignment: AlignmentType): number {
  if (alignment === AlignmentType.left) {
    return (hostDim.left ?? 0) - CARET_OFFSET;
  }
  if (alignment === AlignmentType.right) {
    return (hostDim.left ?? 0) + (hostDim.width ?? 0) - (elmDim.width ?? 0) + CARET_OFFSET;
  }
  return (hostDim.left ?? 0) + (hostDim.width ?? 0) / 2 - (elmDim.width ?? 0) / 2;
}

function verticalPosition(hostDim: Dimensions, elmDim: Dimensions, alignment: AlignmentType): number {
  if (alignment === AlignmentType.top) {
    return (hostDim.top ?? 0) - CARET_OFFSET;
  }
  if (alignment === AlignmentType.bottom) {
    return (hostDim.top ?? 0) + (hostDim.height ?? 0) - (elmDim.height ?? 0) + CARET_OFFSET;
  }
  return (hostDim.top ?? 0) + (hostDim.height ?? 0) / 2 - (elmDim.height ?? 0) / 2;
}

function calculateHorizontalAlignment(hostDim: Dimensions, elmDim: Dimensions, alignment: AlignmentType): number {
  let result = horizontalPosition(hostDim, elmDim, alignment);
  if (result + (elmDim.width ?? 0) > window.innerWidth) {
    result = window.innerWidth - (elmDim.width ?? 0);
  }
  return result;
}

function calculateVerticalAlignment(hostDim: Dimensions, elmDim: Dimensions, alignment: AlignmentType): number {
  let result = verticalPosition(hostDim, elmDim, alignment);
  if (result + (elmDim.height ?? 0) > window.innerHeight) {
    result = window.innerHeight - (elmDim.height ?? 0);
  }
  return result;
}

function shouldFlip(
  hostDim: Dimensions,
  elmDim: Dimensions,
  placement: PlacementType,
  alignment: AlignmentType,
  spacing: number
): boolean {
  if (placement === PlacementType.right) {
    const pos = horizontalPosition(hostDim, elmDim, alignment);
    return pos + (elmDim.width ?? 0) + spacing > window.innerWidth;
  }
  if (placement === PlacementType.left) {
    const pos = horizontalPosition(hostDim, elmDim, alignment);
    return pos - spacing < 0;
  }
  if (placement === PlacementType.top) {
    return (hostDim.top ?? 0) - (elmDim.height ?? 0) - spacing < 0;
  }
  if (placement === PlacementType.bottom) {
    const pos = verticalPosition(hostDim, elmDim, alignment);
    return pos + (elmDim.height ?? 0) + spacing > window.innerHeight;
  }
  return false;
}

/**
 * Determine placement after optional flip to keep tooltip in viewport.
 */
export function determinePlacement(
  placement: PlacementType,
  elmDim: Dimensions,
  hostDim: Dimensions,
  spacing: number,
  alignment: AlignmentType
): PlacementType {
  if (shouldFlip(hostDim, elmDim, placement, alignment, spacing)) {
    if (placement === PlacementType.right) return PlacementType.left;
    if (placement === PlacementType.left) return PlacementType.right;
    if (placement === PlacementType.top) return PlacementType.bottom;
    return PlacementType.top;
  }
  return placement;
}

/**
 * Compute top/left for the tooltip content (fixed positioning).
 */
export function positionContent(
  placement: PlacementType,
  elmDim: Dimensions,
  hostDim: Dimensions,
  spacing: number,
  alignment: AlignmentType
): { top: number; left: number } {
  let top = 0;
  let left = 0;
  if (placement === PlacementType.right) {
    left = (hostDim.left ?? 0) + (hostDim.width ?? 0) + spacing;
    top = calculateVerticalAlignment(hostDim, elmDim, alignment);
  } else if (placement === PlacementType.left) {
    left = (hostDim.left ?? 0) - (elmDim.width ?? 0) - spacing;
    top = calculateVerticalAlignment(hostDim, elmDim, alignment);
  } else if (placement === PlacementType.top) {
    top = (hostDim.top ?? 0) - (elmDim.height ?? 0) - spacing;
    left = calculateHorizontalAlignment(hostDim, elmDim, alignment);
  } else {
    top = (hostDim.top ?? 0) + (hostDim.height ?? 0) + spacing;
    left = calculateHorizontalAlignment(hostDim, elmDim, alignment);
  }
  return { top, left };
}

function calculateHorizontalCaret(
  hostDim: Dimensions,
  elmDim: Dimensions,
  caretDim: Dimensions,
  alignment: AlignmentType
): number {
  let result: number;
  if (alignment === AlignmentType.left) {
    result = (hostDim.width ?? 0) / 2 - (caretDim.width ?? 0) / 2 + CARET_OFFSET;
  } else if (alignment === AlignmentType.right) {
    result = (elmDim.width ?? 0) - (hostDim.width ?? 0) / 2 - (caretDim.width ?? 0) / 2 - CARET_OFFSET;
  } else {
    result = (elmDim.width ?? 0) / 2 - (caretDim.width ?? 0) / 2;
  }
  const popoverPos = horizontalPosition(hostDim, elmDim, alignment);
  if (popoverPos + (elmDim.width ?? 0) > window.innerWidth) {
    result += popoverPos + (elmDim.width ?? 0) - window.innerWidth;
  }
  return result;
}

function calculateVerticalCaret(
  hostDim: Dimensions,
  elmDim: Dimensions,
  caretDim: Dimensions,
  alignment: AlignmentType
): number {
  let result: number;
  if (alignment === AlignmentType.top) {
    result = (hostDim.height ?? 0) / 2 - (caretDim.height ?? 0) / 2 + CARET_OFFSET;
  } else if (alignment === AlignmentType.bottom) {
    result = (elmDim.height ?? 0) - (hostDim.height ?? 0) / 2 - (caretDim.height ?? 0) / 2 - CARET_OFFSET;
  } else {
    result = (elmDim.height ?? 0) / 2 - (caretDim.height ?? 0) / 2;
  }
  const popoverPos = verticalPosition(hostDim, elmDim, alignment);
  if (popoverPos + (elmDim.height ?? 0) > window.innerHeight) {
    result += popoverPos + (elmDim.height ?? 0) - window.innerHeight;
  }
  return result;
}

/**
 * Compute top/left for the caret element (relative to tooltip content).
 */
export function positionCaret(
  placement: PlacementType,
  elmDim: Dimensions,
  hostDim: Dimensions,
  caretDim: Dimensions,
  alignment: AlignmentType
): { top: number; left: number } {
  let top = 0;
  let left = 0;
  if (placement === PlacementType.right) {
    left = -CARET_OFFSET;
    top = calculateVerticalCaret(hostDim, elmDim, caretDim, alignment);
  } else if (placement === PlacementType.left) {
    left = elmDim.width ?? 0;
    top = calculateVerticalCaret(hostDim, elmDim, caretDim, alignment);
  } else if (placement === PlacementType.top) {
    top = elmDim.height ?? 0;
    left = calculateHorizontalCaret(hostDim, elmDim, caretDim, alignment);
  } else {
    top = -CARET_OFFSET;
    left = calculateHorizontalCaret(hostDim, elmDim, caretDim, alignment);
  }
  return { top, left };
}
