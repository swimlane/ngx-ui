import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewEncapsulation } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationType } from './notification.type';
import { NotificationStyleType } from './notification-style.type';

@Component({
  selector: 'ngx-notification',
  template: `
    <div>
      <h2 class="ngx-notification-title" [innerHTML]="title"></h2>
      <p class="ngx-notification-body" [innerHTML]="body"></p>
      <template
        *ngIf="template"
        [ngTemplateOutlet]="template"
        [ngOutletContext]="notificationService">
      </template>
      <button
        *ngIf="showClose"
        type="button"
        (click)="onClose()"
        class="icon-x ngx-notification-close">
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {

  @Input() id: string;
  @Input() cssClass: string = '';
  @Input() title: string;
  @Input() body: string;
  @Input() template: any;
  @Input() pauseOnHover: boolean;
  @Input() styleType: NotificationStyleType;
  @Input() showClose: boolean;

  @HostBinding('class')
  get cssClasses() {
    let cls = `ngx-notification ngx-notification-${this.styleType}`;
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
