import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-stepper[largeFormatDialogSubStepper]',
  standalone: false
})
export class LargeFormatDialogSubStepperDirective {
  @HostBinding('class.dialog-stepper--sub') hostClass = true;
}
