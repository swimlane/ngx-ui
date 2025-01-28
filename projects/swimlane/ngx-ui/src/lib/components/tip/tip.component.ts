import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { TipStatus } from './tip-status.enum';

const ICONS = {
  [TipStatus.Error]: 'warning-filled-sm',
  [TipStatus.Warning]: 'alert',
  default: 'info-filled-small'
};

function getIcon(status: TipStatus): string {
  return ICONS[status] || ICONS['default'];
}

@Component({
  selector: 'ngx-tip',
  exportAs: 'ngxTip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngx-tip',
    '[class.ngx-tip--success]': 'status === TipStatus.Success',
    '[class.ngx-tip--error]': 'status === TipStatus.Error',
    '[class.ngx-tip--notice]': 'status === TipStatus.Notice',
    '[class.ngx-tip--warning]': 'status === TipStatus.Warning'
  },
  standalone: false
})
export class TipComponent implements OnChanges, OnDestroy {
  @Input() status: TipStatus;
  @Input() isCloseable = false;
  @Input() icon: string;

  @Output() close = new EventEmitter();

  readonly TipStatus = TipStatus;

  ngOnChanges(): void {
    if (!this.icon) {
      this.icon = getIcon(this.status);
    }
  }

  ngOnDestroy(): void {
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
