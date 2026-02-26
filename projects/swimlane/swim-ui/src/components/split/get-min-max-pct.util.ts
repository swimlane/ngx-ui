import { basisToValue } from './basis-to-value.util';
import { isPercent } from './is-percent.util';

export function getMinMaxPct(
  minBasis: string | undefined,
  maxBasis: string | undefined,
  grow: string,
  shrink: string,
  baseBasisPct: number,
  basisToPx: number
): [number, number] {
  let minBasisPct = minBasis ? (isPercent(minBasis) ? basisToValue(minBasis) : basisToValue(minBasis) / basisToPx) : 0;
  let maxBasisPct = maxBasis
    ? isPercent(maxBasis)
      ? basisToValue(maxBasis)
      : basisToValue(maxBasis) / basisToPx
    : 100;

  minBasisPct = Math.max(minBasisPct, shrink === '0' ? baseBasisPct : 0);
  maxBasisPct = Math.min(maxBasisPct, grow === '0' ? baseBasisPct : 100);

  return [minBasisPct, maxBasisPct];
}
