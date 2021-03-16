import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import { Subscription } from 'rxjs';
import { NotificationStyleType } from './enums';

@Component({
  selector: 'ngx-notification',
  exportAs: 'ngxNotification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
  @Input() cssClass: string = '';
  @Input() title?: string;
  @Input() body?: string;
  @Input() template?: TemplateRef<unknown>;
  @Input() styleType?: NotificationStyleType;
  @Input() icon?: string;
  @Input() timeout?: false | number;

  @InputBoolean()
  @Input()
  showClose?: boolean;

  @InputBoolean()
  @Input()
  pauseOnHover?: boolean;

  @InputNumeric()
  @Input()
  timestamp?: number;

  @Output() close = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() resume = new EventEmitter<void>();

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
      this.pause.emit();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.pauseOnHover) {
      this.resume.emit();
    }
  }
}
