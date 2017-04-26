import { 
  Directive, Input, ChangeDetectionStrategy, ContentChild, 
  ContentChildren, AfterContentInit, QueryList, ElementRef
} from '@angular/core';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleDirective } from './split-handle.directive';

@Directive({
  selector: '[ngxSplit]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngx-split'
  }
})
export class SplitDirective implements AfterContentInit {

  /*tslint:disable*/
  @Input('ngxSplit') 
  direction: string = 'row';
  /*tslint:enable*/

  @ContentChild(SplitHandleDirective) handle: SplitHandleDirective;
  @ContentChildren(SplitAreaDirective) areas: QueryList<SplitAreaDirective>;

  constructor(private elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    this.handle.drag.subscribe(pos => this.onDrag(pos));
  }

  onDrag({ x, y }): void {
    const parentWidth = this.elementRef.nativeElement.clientWidth;
    const delta = this.direction === 'row' ? x : y;

    this.areas.forEach((area, i) => {
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
      let newAreaPx = (areaDiff / parentWidth) * 100;
      newAreaPx = Math.max(newAreaPx, 0);
      newAreaPx = Math.min(newAreaPx, 100);

      // update flexlayout
      flex._inputMap.flex = newAreaPx + '%';
      flex._updateStyle();
    });
  }

}
