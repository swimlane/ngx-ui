import { Component, Input } from '@angular/core';
import { NotificationType } from './notification.type';

@Component({
  selector: 'ngx-notification-container',
  template: `
    <div class="notification-container">
      <div *ngFor="let notification of htmlNotifications; trackBy: notification?.id">
        <ngx-notification
          [id]="notification.id"
          [showClose]="notification.showClose"
          [styleType]="notification.styleType"
          [cssClass]="notification.cssClass"
          [title]="notification.title"
          [pauseOnHover]="notification.pauseOnHover"
          [template]="notification.template"
          [body]="notification.body">
        </ngx-notification>
      </div>
    </div>
  `,
  host: {
    class: 'ngx-notification-container'
  }
})
export class NotificationContainerComponent {

  @Input() notifications: any;

  get htmlNotifications() {
    return this.notifications.filter(n => {
      return n.type === NotificationType.html;
    });
  }

}
