import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewEncapsulation, TemplateRef } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

import { NotificationStyleType } from './notification-style-type.enum';

@Component({
  exportAs: 'ngxNotification',
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent {
  @Input() cssClass: string = '';
  @Input() title: string;
  @Input() body: string;
  @Input() template: TemplateRef<any>;
  @Input() styleType: NotificationStyleType;
  @Input() icon: string;

  @Input()
  get showClose() { return this._showClose; }
  set showClose(showClose) {
    this._showClose = coerceBooleanProperty(showClose);
  }

  @Input()
  get pauseOnHover() { return this._pauseOnHover; }
  set pauseOnHover(pauseOnHover) {
    this._pauseOnHover = coerceBooleanProperty(pauseOnHover);
  }

  @Input()
  get timestamp() { return this._timestamp; }
  set timestamp(timestamp) {
    this._timestamp = coerceNumberProperty(timestamp);
  }

  @Output() close = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() resume = new EventEmitter<void>();

  readonly NotificationStyleType = NotificationStyleType;
  timeout: any;
  timer: any;

  private _showClose?: boolean;
  private _pauseOnHover?: boolean;
  private _timestamp?: number;

  @HostBinding('class')
  get cssClasses(): string {
    let cls = `ngx-notification ngx-notification-${this.styleType}`;
    if (this.cssClass) cls += ` ${this.cssClass}`;
    if (this.showClose) cls += ' notification-closeable';
    return cls;
  }

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
