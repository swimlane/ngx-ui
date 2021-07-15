import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { TipStatus } from './enums';

@Component({
  selector: 'ngx-tip',
  exportAs: 'ngxTip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TipComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_isCloseable: BooleanInput;

  @Input('status') set _status(v: EnumKey<typeof TipStatus>) {
    this.status = TipStatus[v];
  }

  status = TipStatus.notice;

  @NgxBooleanInput()
  @Input()
  isCloseable = false;

  @Output() tipClose = new EventEmitter();

  icon?: string;

  @HostBinding('class.ngx-tip') hostClass = true;

  @HostBinding('class.ngx-tip--success') get successClass() {
    return this.status === TipStatus.success;
  }

  @HostBinding('class.ngx-tip--error') get errorClass() {
    return this.status === TipStatus.error;
  }

  @HostBinding('class.ngx-tip--notice') get noticeClass() {
    return this.status === TipStatus.notice;
  }

  ngOnInit() {
    this.icon =
      this.status === TipStatus.error
        ? 'warning-filled-sm'
        : 'info-filled-small';
  }

  ngOnDestroy() {
    this.tipClose.emit();
  }

  onClose() {
    this.tipClose.emit();
  }
}
