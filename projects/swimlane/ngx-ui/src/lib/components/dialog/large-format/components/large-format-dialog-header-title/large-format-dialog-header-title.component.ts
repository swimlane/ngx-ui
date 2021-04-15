import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-large-format-dialog-header-title',
  template: `
    <div
      class="ngx-large-format-dialog-header-title__text-wrapper ngx-large-format-dialog-header-title__text-wrapper--title"
    >
      <h1>{{ title }}</h1>
    </div>
    <div class="ngx-large-format-dialog-header-title__text-wrapper">
      <h4 *ngIf="subtitle">{{ subtitle }}</h4>
    </div>
  `,
  styleUrls: ['./large-format-dialog-header-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LargeFormatDialogHeaderTitleComponent {
  @Input() title = '';
  @Input() subtitle?: string;

  @HostBinding('class.ngx-large-format-dialog-header-title') hostClass = true;
}
