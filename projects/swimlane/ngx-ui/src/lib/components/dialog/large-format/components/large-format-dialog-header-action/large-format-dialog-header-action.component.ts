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
    <section (click)="closeOrCancel.emit(dirty)">
      <i class="ngx-large-format-dialog-header-action__icon ngx-icon ngx-x"></i>
      <button type="button" class="ngx-large-format-dialog-header-action__button btn btn-link">
        {{ dirty ? dirtyActionTitle : actionTitle }}
      </button>
    </section>
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
