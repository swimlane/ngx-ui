import { Component, Input } from '@angular/core';
import { NotificationType } from './notification.type';

@Component({
  selector: 'swui-notification-container',
  template: `
    <div class="notification-container">
      <div *ngFor="let notification of htmlNotifications; trackBy: notification?.id">
        <swui-notification
          [id]="notification.id"
          [showClose]="notification.showClose"
          [styleType]="notification.styleType"
          [cssClass]="notification.cssClass"
          [title]="notification.title"
          [pauseOnHover]="notification.pauseOnHover"
          [template]="notification.template"
          [body]="notification.body">
        </swui-notification>
      </div>
    </div>
  `,
  host: {
    class: 'swui-notification-container'
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
