import { 
  Component, Input, ChangeDetectionStrategy, ContentChild, ViewEncapsulation,
  ContentChildren, AfterContentInit, QueryList, ElementRef, HostBinding
} from '@angular/core';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';

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
    this.handles.forEach(d => d.drag.subscribe(pos => this.onDrag(pos)));
    this.handles.forEach(d => d.dblclick.subscribe(pos => this.onDblClick(pos)));
  }

  onDblClick(pos): void {
    const parentWidth = this.elementRef.nativeElement.clientWidth;

    const area = this.areas.first;
    if (!area) return;

    const flex = (area.flex as any);
    const flexPerc = flex._inputMap.flex;

    const areaCur = parseFloat(flexPerc);
    const areaPx = parentWidth * (areaCur / 100);

    const minAreaPct = area.minAreaPct || 0;
    const maxAreaPct = area.maxAreaPct || 100;

    const deltaMin = areaCur - minAreaPct;
    const deltaMax = maxAreaPct - areaCur;

    const delta = (deltaMin < deltaMax) ? deltaMax : -deltaMin;
    const deltaPx = delta / 100 * parentWidth;

    this.resize(deltaPx);
  }

  onDrag({ x, y }): void {
    const deltaPx = this.direction === 'row' ? x : y;
    this.resize(deltaPx);
  }

  resize(delta): void {
    const parentWidth = this.elementRef.nativeElement.clientWidth;

    this.areas.forEach((area, i) => {
      const minAreaPct = area.minAreaPct || 0;
      const maxAreaPct = area.maxAreaPct || 100;

      // get the cur flex
      const flex = (area.flex as any);
      const flexPerc = flex._inputMap.flex;

      // get the % in px
      const areaCur = parseFloat(flexPerc);
      const areaPx = parentWidth * (areaCur / 100);

      // determine which dir and calc the diff
      let areaDiff;
      if(i === 0) {
        areaDiff = areaPx + delta;
      } else {
        areaDiff = areaPx - delta;
      }

      // convert the px to %
      let newAreaPct = (areaDiff / parentWidth) * 100;
      newAreaPct = Math.max(newAreaPct, minAreaPct);
      newAreaPct = Math.min(newAreaPct, maxAreaPct);

      // update flexlayout
      flex._inputMap.flex = newAreaPct + '%';
      flex._updateStyle();
    });
  }

}
