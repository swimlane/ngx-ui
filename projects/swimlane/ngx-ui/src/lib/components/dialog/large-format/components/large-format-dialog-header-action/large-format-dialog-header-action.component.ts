import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ngx-large-format-dialog-header-action',
  template: `
    <i class="ngx-large-format-dialog-header-action__icon ngx-icon ngx-x" (click)="closeOrCancel.emit(dirty)"></i>
    <button
      type="button"
      class="ngx-large-format-dialog-header-action__button btn btn-link"
      (click)="closeOrCancel.emit(dirty)"
    >
      {{ dirty ? dirtyActionTitle : actionTitle }}
    </button>
  `,
  styleUrls: ['./large-format-dialog-header-action.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LargeFormatDialogHeaderActionComponent {
  @Input() actionTitle = 'Close';
  @Input() dirty = false;
  @Input() dirtyActionTitle = 'Cancel';

  @Output() closeOrCancel = new EventEmitter<boolean>();

  @HostBinding('class.ngx-large-format-dialog-header-action') hostClass = true;
}
