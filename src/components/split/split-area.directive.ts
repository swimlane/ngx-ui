import { Directive, ChangeDetectionStrategy, Optional, Self, HostBinding, Input } from '@angular/core';
import { FlexDirective } from '@angular/flex-layout/flexbox/api/flex';

@Directive({
  selector: '[ngxSplitArea]',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitAreaDirective {

  @Input()
  set minAreaPct(val: any) {
    if (typeof val === 'string') {
      val = +val.replace('%', '');
    }
    this._minAreaPct = val;
  }
  get minAreaPct(): any {
    return this._minAreaPct;
  }

  @Input()
  set maxAreaPct(val: any) {
    if (typeof val === 'string') {
      val = +val.replace('%', '');
    }
    this._maxAreaPct = val;
  }
  get maxAreaPct(): any {
    return this._maxAreaPct;
  }

  _minAreaPct: number = 0;
  _maxAreaPct: number = 100;

  @HostBinding('class.ngx-split-area')
  cssClass = true;

  constructor(@Optional() @Self() public flex: FlexDirective) { }

}
