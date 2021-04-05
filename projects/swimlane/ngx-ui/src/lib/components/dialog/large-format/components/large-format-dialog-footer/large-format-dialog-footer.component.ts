import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-large-format-dialog-footer',
  template: ` <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LargeFormatDialogFooterComponent {
  @HostBinding('class.ngx-large-format-dialog-footer') hostClass = true;
}
