import { Directive, HostBinding, Input } from '@angular/core';
import {
  BooleanInput,
  Controller,
  NgxBooleanInput,
} from '@swimlane/ngx-ui/common';

@Directive({
  selector: '[ngxAutosize]',
  exportAs: 'ngxAutosize',
})
export class AutosizeControllerDirective extends Controller {
  static ngAcceptInputType_ngxAutosize: BooleanInput;

  @HostBinding('class.autosize')
  @NgxBooleanInput()
  @Input()
  ngxAutosize = false;
}
