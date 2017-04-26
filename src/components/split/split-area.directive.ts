import { 
  Directive, Input, ChangeDetectionStrategy, Optional, Self, 
  ContentChild, QueryList, HostBinding 
} from '@angular/core';
import { FlexDirective } from '@angular/flex-layout/flexbox/api/flex';

@Directive({
  selector: '[ngxSplitArea]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngx-split-area'
  }
})
export class SplitAreaDirective {

  constructor(@Optional() @Self() public flex: FlexDirective) { }

}
