import { ElementRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-large-format-dialog-header-title',
  templateUrl: './large-format-dialog-header-title.component.html',
  styleUrls: ['./large-format-dialog-header-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LargeFormatDialogHeaderTitleComponent {
  constructor(public elementRef: ElementRef) {}
  @Input() dialogTitle = '';
  @Input() dialogSubtitle?: string;
  @Input() imageTemplate: any;
  @HostBinding('class.ngx-large-format-dialog-header-title') hostClass = true;
}
