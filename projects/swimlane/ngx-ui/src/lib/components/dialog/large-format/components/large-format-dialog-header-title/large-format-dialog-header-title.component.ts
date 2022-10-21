import { ElementRef, TemplateRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-large-format-dialog-header-title, ngx-medium-format-dialog-header-title',
  templateUrl: './large-format-dialog-header-title.component.html',
  styleUrls: ['./large-format-dialog-header-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LargeFormatDialogHeaderTitleComponent {
  @Input() format: 'large' | 'medium' = 'large';
  @Input() dialogTitle = '';
  @Input() dialogSubtitle?: string;
  @Input() imageTemplate: any;
  @Input() dialogSubtitleTemplate: TemplateRef<unknown>;

  @HostBinding('class.ngx-large-format-dialog-header-title')
  get isLargeFormat() {
    return this.format === 'large';
  }

  @HostBinding('class.ngx-medium-format-dialog-header-title')
  get isMediumFormat() {
    return this.format === 'medium';
  }

  constructor(public elementRef: ElementRef) {
    if (elementRef.nativeElement.tagName.toLowerCase() === 'ngx-medium-format-dialog-header-title') {
      this.format = 'medium';
    }
  }
}
