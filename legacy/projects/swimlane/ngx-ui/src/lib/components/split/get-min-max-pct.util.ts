import { basisToValue } from './basis-to-value.util';
import { isPercent } from './is-percent.util';

export function getMinMaxPct(
  minBasis: string,
  maxBasis: string,
  grow: string,
  shrink: string,
  baseBasisPct: number,
  basisToPx: number
) {
  // minimum and maximum basis determined by max/min inputs
  let minBasisPct = isPercent(minBasis) ? basisToValue(minBasis) : basisToValue(minBasis) / basisToPx;
  let maxBasisPct = isPercent(maxBasis) ? basisToValue(maxBasis) : basisToValue(maxBasis) / basisToPx;

  // minimum and maximum basis determined by flex inputs
  minBasisPct = Math.max(minBasisPct || 0, shrink === '0' ? baseBasisPct : 0);
  maxBasisPct = Math.min(maxBasisPct || 100, grow === '0' ? baseBasisPct : 100);

  return [minBasisPct, maxBasisPct];
}
