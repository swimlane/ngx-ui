import { Directive, HostBinding, Input } from '@angular/core';
import {
  BooleanInput,
  Controller,
  NgxBooleanInput,
} from '@swimlane/ngx-ui/common';

@Directive({
  selector: '[ngxMarginless]',
  exportAs: 'ngxMarginless',
})
export class MarginlessControllerDirective extends Controller {
  static ngAcceptInputType_ngxMarginless: BooleanInput;

  @HostBinding('class.marginless')
  @NgxBooleanInput()
  @Input()
  ngxMarginless = false;
}
