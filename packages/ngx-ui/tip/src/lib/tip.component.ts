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
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import { EnumKey } from '@swimlane/ngx-ui/types';
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

  @InputEnum(TipStatus)
  @Input()
  _status?: EnumKey<typeof TipStatus>;
  status?: TipStatus;

  @InputBoolean()
  @Input()
  isCloseable = false;

  @Output()
  close = new EventEmitter();

  icon?: string;

  @HostBinding('class.ngx-tip') hostClass = true;

  @HostBinding('class.ngx-tip--success') get successClass() {
    return this.status === TipStatus.Success;
  }

  @HostBinding('class.ngx-tip--error') get errorClass() {
    return this.status === TipStatus.Error;
  }

  @HostBinding('class.ngx-tip--notice') get noticeClass() {
    return this.status === TipStatus.Notice;
  }

  ngOnInit() {
    this.icon =
      this.status === TipStatus.Error
        ? 'warning-filled-sm'
        : 'info-filled-small';
  }

  ngOnDestroy() {
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
