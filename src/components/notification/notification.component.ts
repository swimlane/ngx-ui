import { Component, Input, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationType } from './notification.type';
import './notification.scss';

@Component({
  selector: 'swui-notification',
  template: `
    <div>
      <h2 class="swui-notification-title" [innerHTML]="title"></h2>
      <p class="swui-notification-content" [innerHTML]="content"></p>
      <template
        *ngIf="template"
        [ngTemplateOutlet]="template"
        [ngOutletContext]="notificationService">
      </template>
      <button
        *ngIf="showClose"
        type="button"
        (click)="onClose()"
        class="icon-x swui-notification-close">
      </button>
    </div>
  `
})
export class NotificationComponent {

  @Input() id: string;
  @Input() cssClass: string = '';
  @Input() title: string;
  @Input() content: string;
  @Input() template: any;
  @Input() pauseOnHover: boolean;
  @Input() type: NotificationType;
  @Input() showClose: boolean;

  @HostBinding('class')
  get cssClasses() {
    let cls = `swui-notification swui-notification-${this.type}`;
    if(this.cssClass) cls += ` ${this.cssClass}`;
    if(this.showClose) cls += ' notification-closeable';
    return cls;
  }

  constructor(private notificationService: NotificationService) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    if(this.pauseOnHover) {
      this.notificationService.pauseTimer(this.id);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if(this.pauseOnHover) {
      this.notificationService.startTimer(this.id);
    }
  }

  onClose() {
    this.notificationService.destroy(this.id);
  }

}
