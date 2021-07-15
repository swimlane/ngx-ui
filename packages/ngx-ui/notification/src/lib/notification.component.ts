import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgxBooleanInput, NgxNumericInput } from '@swimlane/ngx-ui/common';
import { Subscription } from 'rxjs';
import { NotificationStyleType } from './enums';

@Component({
  selector: 'ngx-notification',
  exportAs: 'ngxNotification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() cssClass = '';
  @Input() title?: string;
  @Input() body?: string;
  @Input() template?: TemplateRef<unknown>;
  @Input() styleType?: NotificationStyleType;
  @Input() icon?: string;
  @Input() timeout?: false | number;

  @NgxBooleanInput()
  @Input()
  showClose?: boolean;

  @NgxBooleanInput()
  @Input()
  pauseOnHover?: boolean;

  @NgxNumericInput()
  @Input()
  timestamp?: number;

  @Output() notificationClose = new EventEmitter<void>();
  @Output() notificationPause = new EventEmitter<void>();
  @Output() notificationResume = new EventEmitter<void>();

  @HostBinding('class')
  get cssClasses(): string {
    let cls = `ngx-notification ngx-notification-${this.styleType}`;
    if (this.cssClass) cls += ` ${this.cssClass}`;
    if (this.showClose) cls += ' notification-closeable';
    return cls;
  }

  get animationDuration() {
    if (typeof this.timeout !== 'number') {
      return '3000s';
    }
    return `${this.timeout}ms`;
  }

  readonly NotificationStyleType = NotificationStyleType;
  timerSubscription?: Subscription;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.pauseOnHover) {
      this.notificationPause.emit();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.pauseOnHover) {
      this.notificationResume.emit();
    }
  }
}
