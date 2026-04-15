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
  templateUrl: './large-format-dialog-header-action.component.html',
  styleUrls: ['./large-format-dialog-header-action.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class LargeFormatDialogHeaderActionComponent {
  @Input() actionTitle = 'Close';
  @Input() dirty = false;
  @Input() dirtyActionTitle = 'Cancel';
  @Input() showUndoRedo = false;
  @Input() undoRedoState: { canUndo: boolean; canRedo: boolean } = { canUndo: false, canRedo: false };
  @Output() undo = new EventEmitter<void>();
  @Output() redo = new EventEmitter<void>();

  @Output() closeOrCancel = new EventEmitter<boolean>();

  @HostBinding('class.ngx-large-format-dialog-header-action') hostClass = true;
}
