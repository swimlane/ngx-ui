import { 
  Component, Input, ChangeDetectionStrategy, ContentChild, ViewEncapsulation,
  ContentChildren, AfterContentInit, QueryList, ElementRef, HostBinding
} from '@angular/core';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';

import { validateBasis } from '@angular/flex-layout/utils/basis-validator';

function getParts(flex: any) {
  const basis = flex._queryInput('flex') || '';
  return validateBasis(
      String(basis).replace(';', ''),
      flex._queryInput('grow'), 
      flex._queryInput('shrink')
    )
    .map(n => parseFloat(n));
}

@Component({
  selector: '[ngxSplit]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./split.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SplitComponent implements AfterContentInit {

  /*tslint:disable*/
  @Input('ngxSplit') 
  direction: string = 'row';
  /*tslint:enable*/

  @HostBinding('class.ngx-split')
  get mainCss() { return true; }

  @HostBinding('class.row-split')
  get rowCss() { return this.direction === 'row'; }

  @HostBinding('class.column-split')
  get columnCss() { return this.direction === 'column'; }

  @ContentChildren(SplitHandleComponent, { descendants: false }) handles: QueryList<SplitHandleComponent>;
  @ContentChildren(SplitAreaDirective) areas: QueryList<SplitAreaDirective>;

  constructor(private elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    this.handles.forEach(d => d.drag.subscribe(ev => this.onDrag(ev)));
    this.handles.forEach(d => d.dblclick.subscribe(ev => this.onDblClick(ev)));
  }

  onDblClick(ev): void {
    const basisToPx = (this.direction === 'row' ?
      this.elementRef.nativeElement.clientWidth :
      this.elementRef.nativeElement.clientHeight) / 100;

    const area = this.areas.first;
    if (!area) return;

    const flex = (area.flex as any);
    const [grow, shrink, basis] = getParts(flex);

    const areaPx = basisToPx * basis;

    // get and/or store baseBasis
    const baseBasis = flex.baseBasis = flex.baseBasis || basis;

    // minimum and maximum basis determined by inputs
    const minBasis = Math.max(area.minAreaPct || 0, shrink === 0 ? baseBasis : 0);
    const maxBasis = Math.min(area.maxAreaPct || 100, grow === 0 ? baseBasis : 100);

    const deltaMin = basis - minBasis;
    const deltaMax = maxBasis - basis;

    const delta = (deltaMin < deltaMax) ? deltaMax : -deltaMin;
    const deltaPx = delta * basisToPx;

    this.resize(deltaPx);
  }

  onDrag({ movementX, movementY }): void {
    const deltaPx = this.direction === 'row' ? movementX : movementY;
    this.resize(deltaPx);
  }

  resize(delta: number): void {
    const basisToPx = (this.direction === 'row' ?
      this.elementRef.nativeElement.clientWidth :
      this.elementRef.nativeElement.clientHeight) / 100;

    const areas = this.areas.toArray();

    // for now assuming splitter is after first area
    const [first, ...rest] = areas;
    [first].forEach(area => delta = resizeAreaBy(area, delta));

    // delta is distributed left to right
    return rest.forEach(area => delta += resizeAreaBy(area, -delta));

    function resizeAreaBy(area, _delta) {
      const flex = area.flex as any;
      const [grow, shrink, basis] = getParts(flex);

      // get and/or store baseBasis
      const baseBasis = flex.baseBasis = flex.baseBasis || basis;
  
      // minimum and maximum basis determined by inputs
      const minBasis = Math.max(area.minAreaPct || 0, shrink === 0 ? baseBasis : 0);
      const maxBasis = Math.min(area.maxAreaPct || 100, grow === 0 ? baseBasis : 100);

      // get area in px
      const basisPx = basis * basisToPx;

      // determine which dir and calc the diff
      const newBasisPx = basisPx + _delta;

      // convert the px to %
      let newBasis = newBasisPx / basisToPx;
      newBasis = Math.max(newBasis, minBasis);
      newBasis = Math.min(newBasis, maxBasis);

      // update flexlayout
      flex.flex = `${grow} ${shrink} ${newBasis}`;
      flex._updateStyle(newBasis);

      // return actual change in px
      return newBasis * basisToPx - basisPx;
    }
  }
}
