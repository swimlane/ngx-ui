import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ng-template[ngxLargeFormatDialogSubStepper]',
})
export class LargeFormatDialogSubStepperDirective {
  @HostBinding('class.dialog-stepper--sub') hostClass = true;
}
