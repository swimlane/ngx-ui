import { SplitAreaDirective } from './split-area.directive';
import { isPercent } from './is-percent.util';
import { basisToValue } from './basis-to-value.util';
import { getMinMaxPct } from './get-min-max-pct.util';

export function resizeAreaBy(area: SplitAreaDirective, _delta: number, basisToPx: number) {
  if (area.fxFlexFill) {
    // area is fxFlexFill, distribute delta right
    return _delta;
  }

  const [grow, shrink, basis] = area.currentFlexBasis;
  const isPct = isPercent(basis);
  const basisValue = basisToValue(basis);

  // get baseBasis in percent
  const baseBasis = area.initialFlexBasis[2];
  const baseBasisPct = basisToValue(baseBasis) / (isPercent(baseBasis) ? basisToPx : 1);

  // get basis in px and %
  const basisPx = isPct ? basisValue * basisToPx : basisValue;

  // determine which dir and calc the diff
  let newBasisPx = basisPx + _delta;
  let newBasisPct = newBasisPx / basisToPx;

  const [minBasisPct, maxBasisPct] = getMinMaxPct(area.minBasis, area.maxBasis, grow, shrink, baseBasisPct, basisToPx);

  // obey max and min
  newBasisPct = Math.max(newBasisPct, minBasisPct);
  newBasisPct = Math.min(newBasisPct, maxBasisPct);

  // calculate new basis on px
  newBasisPx = newBasisPct * basisToPx;

  // update flexlayout
  area.updateStyle(isPct ? newBasisPct : newBasisPx);

  // return actual change in px
  return newBasisPx - basisPx;
}
