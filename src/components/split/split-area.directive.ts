import { 
  Directive, Input, ChangeDetectionStrategy, Optional, Self, 
  ContentChild, QueryList, HostBinding 
} from '@angular/core';
import { FlexDirective } from '@angular/flex-layout/flexbox/api/flex';

@Directive({
  selector: '[ngxSplitArea]',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitAreaDirective {

  @HostBinding('class.ngx-split-area')
  get cssClass() { return true; }

  constructor(@Optional() @Self() public flex: FlexDirective) { }

}
