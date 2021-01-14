import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { TipStatus } from './tip-status.enum';

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
    '[class.ngx-tip--notice]': 'status === TipStatus.Notice'
  }
})
export class TipComponent implements OnInit, OnDestroy {
  @Input() status: TipStatus;
  @Input() isCloseable = false;

  @Output() close = new EventEmitter();

  icon: string;
  readonly TipStatus = TipStatus;

  ngOnInit() {
    this.icon = this.status === TipStatus.Error ? 'warning-filled-sm' : 'info-filled-small';
  }

  ngOnDestroy() {
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
