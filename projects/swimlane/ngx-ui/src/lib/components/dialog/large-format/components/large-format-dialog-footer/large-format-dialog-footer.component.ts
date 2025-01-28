import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-large-format-dialog-footer, ngx-medium-format-dialog-footer',
  template: ' <ng-content></ng-content> ',
  styleUrls: ['./large-format-dialog-footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class LargeFormatDialogFooterComponent {
  @Input() styleClass?: string;
  @Input() format: 'large' | 'medium' = 'large';

  @HostBinding('class') get footerStyle() {
    if (this.styleClass) {
      return this.styleClass;
    }
    if (this.format === 'medium') {
      return 'ngx-medium-format-dialog-footer--default';
    }
    return 'ngx-large-format-dialog-footer--default';
  }

  @HostBinding('class.ngx-large-format-dialog-footer')
  get isLargeFormat() {
    return this.format === 'large';
  }

  @HostBinding('class.ngx-medium-format-dialog-footer')
  get isMediumFormat() {
    return this.format === 'medium';
  }

  constructor(public elementRef: ElementRef) {
    if (elementRef.nativeElement.tagName.toLowerCase() === 'ngx-medium-format-dialog-footer') {
      this.format = 'medium';
    }
  }
}
