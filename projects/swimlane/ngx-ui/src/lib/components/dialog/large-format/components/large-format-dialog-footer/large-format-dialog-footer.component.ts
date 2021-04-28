import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-large-format-dialog-footer',
  template: ` <ng-content></ng-content>`,
  styleUrls: ['./large-format-dialog-footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LargeFormatDialogFooterComponent {
  @Input() styleClass?: string;

  @HostBinding('class') get footerStyle() {
    if (this.styleClass) {
      return this.styleClass;
    }
    return 'ngx-large-format-dialog-footer--default';
  }

  @HostBinding('class.ngx-large-format-dialog-footer') hostClass = true;
}
