import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-stepper[ngxLargeFormatDialogSubStepper]',
})
export class LargeFormatDialogSubStepperDirective {
  @HostBinding('class.dialog-stepper--sub') hostClass = true;
}
