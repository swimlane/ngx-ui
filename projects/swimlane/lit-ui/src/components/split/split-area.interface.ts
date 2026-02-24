import type { FlexParts } from './utils';

/**
 * Interface for a split area used by resize logic.
 * Implemented by SwimSplitArea.
 */
export interface ISplitArea {
  currentFlexParts: FlexParts;
  initialFlexParts: FlexParts;
  minBasis: string | undefined;
  maxBasis: string | undefined;
  updateBasis(newBasis: string): void;
}
