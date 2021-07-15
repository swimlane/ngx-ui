import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { Subscription } from 'rxjs';
import { SplitDirection } from '../enums';
import { SplitHandleComponent } from '../split-handle/split-handle.component';
import { basisToValue, getMinMaxPct, isPercent, resizeAreaBy } from '../utils';
import { SplitAreaDirective } from './split-area.directive';

@Directive({
  selector: '[ngxSplit]',
  exportAs: 'ngxSplit',
})
export class SplitDirective implements AfterContentInit, OnChanges, OnDestroy {
  @HostBinding('style.flex-direction')
  @Input('ngxSplit')
  set _direction(v: EnumKey<typeof SplitDirection>) {
    this.direction = SplitDirection[v];
  }

  direction = SplitDirection.row;

  @HostBinding('class.row-split')
  get rowCss() {
    return this.direction === SplitDirection.row;
  }

  @HostBinding('class.column-split')
  get columnCss() {
    return this.direction === SplitDirection.column;
  }

  @ContentChildren(SplitHandleComponent, { descendants: false })
  readonly handles?: QueryList<SplitHandleComponent>;

  @ContentChildren(SplitAreaDirective, { descendants: false })
  readonly areas?: QueryList<SplitAreaDirective>;

  private subscriptions: Subscription[] = [];

  @HostBinding('class.ngx-split') hostClass = true;
  @HostBinding('style.display') hostDisplay = 'flex';

  @HostBinding('style.height')
  @HostBinding('style.width')
  widthHeight = '100%';

  constructor(private readonly elementRef: ElementRef) {}

  ngAfterContentInit(): void {
    this.subscriptions.push(
      ...(this.handles || []).map((d) =>
        d.splitHandleDrag.subscribe((ev: MouseEvent) => this.onDrag(ev))
      )
    );
    this.subscriptions.push(
      ...(this.handles || []).map((d) =>
        d.splitHandleDblClick.subscribe(() => this.onDblClick())
      )
    );
    this.updateHandles();
  }

  ngOnChanges() {
    if (!this.direction) {
      this.direction = SplitDirection.row;
    }
    this.updateHandles();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  resize(delta: number): void {
    const basisToPx =
      (this.rowCss
        ? this.elementRef.nativeElement.clientWidth
        : this.elementRef.nativeElement.clientHeight) / 100;

    const areas = this.areas?.toArray() || [];

    // for now assuming splitter is after first area
    const [first, ...rest] = areas;
    [first].forEach((area) => (delta = resizeAreaBy(area, delta, basisToPx)));

    // delta is distributed left to right
    rest.forEach((area) => (delta += resizeAreaBy(area, -delta, basisToPx)));
  }

  private updateHandles() {
    if (this.handles) {
      this.handles.forEach((d) => (d.direction = this.direction));
    }
  }

  private onDblClick(): void {
    const basisToPx =
      (this.rowCss
        ? this.elementRef.nativeElement.clientWidth
        : this.elementRef.nativeElement.clientHeight) / 100;

    const area = this.areas?.first;

    /* istanbul ignore if */
    if (!area || !area.currentFlexParts) return;

    const [grow, shrink, basis] = area.currentFlexParts;
    const isPct = isPercent(basis);
    const basisValue = basisToValue(basis);

    // get basis in px and %
    const basisPx = isPct ? basisValue * basisToPx : basisValue;
    const basisPct = basisPx / basisToPx;

    if (area.initialFlexParts && area.minBasis && area.maxBasis) {
      // get baseBasis in percent
      const baseBasis = area.initialFlexParts[2];
      const baseBasisPct =
        basisToValue(baseBasis) / (isPercent(baseBasis) ? basisToPx : 1);

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
  }

  private onDrag({ movementX, movementY }: MouseEvent): void {
    const deltaPx =
      this.direction === SplitDirection.row ? movementX : movementY;
    this.resize(deltaPx);
  }
}
