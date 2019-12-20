import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewEncapsulation } from '@angular/core';
import { NotificationStyleType } from './notification-style.type';

@Component({
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() cssClass: string = '';
  @Input() title: string;
  @Input() body: string;
  @Input() template: any;
  @Input() pauseOnHover: boolean;
  @Input() styleType: NotificationStyleType;
  @Input() showClose: boolean;
  @Input() timestamp: any;
  @Input() icon: string;
  @Input() timeout: false | number;

  @Output() close = new EventEmitter();
  @Output() pause = new EventEmitter();
  @Output() resume = new EventEmitter();

  get animationDuration() {
    if (typeof this.timeout !== 'number') {
      return '3000s';
    }
    return `${this.timeout}ms`;
  }

  @HostBinding('class')
  get cssClasses(): string {
    let cls = `ngx-notification ngx-notification-${this.styleType}`;
    if (this.cssClass) cls += ` ${this.cssClass}`;
    if (this.showClose) cls += ' notification-closeable';
    return cls;
  }

  timer: any;

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
