import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'ngx-large-format-dialog-header-title',
  templateUrl: './large-format-dialog-header-title.component.html',
  styleUrls: ['./large-format-dialog-header-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LargeFormatDialogHeaderTitleComponent {
  @Input() dialogTitle = '';
  @Input() dialogSubtitle?: string;
  @Input() imgSrc?: string | SafeUrl;

  @HostBinding('class.ngx-large-format-dialog-header-title') hostClass = true;
}
