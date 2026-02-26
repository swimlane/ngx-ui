import type { ISplitArea } from './split-area.interface';
import { isPercent } from './is-percent.util';
import { basisToValue } from './basis-to-value.util';
import { getMinMaxPct } from './get-min-max-pct.util';

export function resizeAreaBy(area: ISplitArea, delta: number, basisToPx: number): number {
  const [grow, shrink, basis] = area.currentFlexParts;
  const isPct = isPercent(basis);
  const basisValue = basisToValue(basis);

  const baseBasis = area.initialFlexParts[2];
  const baseBasisPct = isPercent(baseBasis) ? basisToValue(baseBasis) : basisToValue(baseBasis) / basisToPx;

  const basisPx = isPct ? basisValue * basisToPx : basisValue;

  let newBasisPx = basisPx + delta;
  let newBasisPct = newBasisPx / basisToPx;

  const [minBasisPct, maxBasisPct] = getMinMaxPct(area.minBasis, area.maxBasis, grow, shrink, baseBasisPct, basisToPx);

  newBasisPct = Math.max(newBasisPct, minBasisPct);
  newBasisPct = Math.min(newBasisPct, maxBasisPct);

  newBasisPx = newBasisPct * basisToPx;

  area.updateBasis(isPct ? newBasisPct + '%' : newBasisPx + 'px');

  return newBasisPx - basisPx;
}
