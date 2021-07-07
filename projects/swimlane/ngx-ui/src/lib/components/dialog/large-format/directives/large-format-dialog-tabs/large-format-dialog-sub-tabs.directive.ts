import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-tabs[largeFormatDialogSubTabs]'
})
export class LargeFormatDialogSubTabsDirective {
  @HostBinding('class.dialog-tabs--sub') hostClass = true;
}
