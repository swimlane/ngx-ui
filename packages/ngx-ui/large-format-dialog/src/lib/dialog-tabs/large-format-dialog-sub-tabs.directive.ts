import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ng-template[ngxLargeFormatDialogSubTabs]',
})
export class LargeFormatDialogSubTabsDirective {
  @HostBinding('class.dialog-tabs--sub') hostClass = true;
}
