import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ngx-tabs[largeFormatDialogSubTabs]',
  standalone: false
})
export class LargeFormatDialogSubTabsDirective {
  @HostBinding('class.dialog-tabs--sub') hostClass = true;
}
