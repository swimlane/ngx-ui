import { Input, ContentChildren, AfterContentInit, QueryList, ElementRef, Directive, OnChanges } from '@angular/core';

import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';
import { SplitDirection } from './split-direction.enum';
import { getMinMaxPct } from './get-min-max-pct.util';
import { basisToValue } from './basis-to-value.util';
import { isPercent } from './is-percent.util';
import { resizeAreaBy } from './resize-area-by.util';

@Directive({
  exportAs: 'ngxSplit',
  selector: '[ngxSplit]',
  host: {
    class: 'ngx-split',
    '[class.row-split]': 'rowCss',
    '[class.column-split]': 'columnCss',
  },
})
export class SplitDirective implements AfterContentInit, OnChanges {
  @Input('ngxSplit') direction = SplitDirection.Row;

  get rowCss() {
    return this.direction === SplitDirection.Row;
  }

  get columnCss() {
    return this.direction === SplitDirection.Column;
  }

  @ContentChildren(SplitHandleComponent, { descendants: false })
  readonly handles: QueryList<SplitHandleComponent>;

  @ContentChildren(SplitAreaDirective, { descendants: false })
  readonly areas: QueryList<SplitAreaDirective>;

  constructor(private readonly elementRef: ElementRef) {}

  ngAfterContentInit(): void {
    this.handles.forEach((d) => d.drag.subscribe((ev: MouseEvent) => this.onDrag(ev)));
    this.handles.forEach((d) => d.dblclick.subscribe(() => this.onDblClick()));
    this.updateHandles();
  }

  ngOnChanges() {
    this.updateHandles();
  }

  updateHandles() {
    if (this.handles) {
      this.handles.forEach((d) => (d.direction = this.direction));
    }
  }

  onDblClick(): void {
    const basisToPx =
      (this.rowCss ? this.elementRef.nativeElement.clientWidth : this.elementRef.nativeElement.clientHeight) / 100;

    const area = this.areas.first;

    /* istanbul ignore if */
    if (!area) return;

    const [grow, shrink, basis] = area.currentFlexBasis;
    const isPct = isPercent(basis);
    const basisValue = basisToValue(basis);

    // get basis in px and %
    const basisPx = isPct ? basisValue * basisToPx : basisValue;
    const basisPct = basisPx / basisToPx;

    // get baseBasis in percent
    const baseBasis = area.initialFlexBasis[2];
    const baseBasisPct = basisToValue(baseBasis) / (isPercent(baseBasis) ? basisToPx : 1);

    const [minBasisPct, maxBasisPct] = getMinMaxPct(
      area.minBasis,
      area.maxBasis,
      grow,
      shrink,
      baseBasisPct,
      basisToPx
    );

    // max and min deltas
    const deltaMin = basisPct - minBasisPct;
    const deltaMax = maxBasisPct - basisPct;

    const delta = deltaMin < deltaMax ? deltaMax : -deltaMin;
    const deltaPx = delta * basisToPx;

    this.resize(deltaPx);
  }

  onDrag({ movementX, movementY }: MouseEvent): void {
    const deltaPx = this.direction === SplitDirection.Row ? movementX : movementY;
    this.resize(deltaPx);
  }

  resize(delta: number): void {
    const basisToPx =
      (this.rowCss ? this.elementRef.nativeElement.clientWidth : this.elementRef.nativeElement.clientHeight) / 100;

    const areas = this.areas.toArray();

    // for now assuming splitter is after first area
    const [first, ...rest] = areas;
    [first].forEach((area) => (delta = resizeAreaBy(area, delta, basisToPx)));

    // delta is distributed left to right
    rest.forEach((area) => (delta += resizeAreaBy(area, -delta, basisToPx)));
  }
}
