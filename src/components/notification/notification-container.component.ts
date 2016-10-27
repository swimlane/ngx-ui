import { Component, Input } from '@angular/core';

@Component({
  selector: 'swui-notification-container',
  template: `
    <div class="notification-container">
      <div *ngFor="let notification of notifications">
        <swui-notification
          [id]="notification.id"
          [showClose]="notification.showClose"
          [type]="notification.type"
          [cssClass]="notification.cssClass"
          [title]="notification.title"
          [pauseOnHover]="notification.pauseOnHover"
          [template]="notification.template"
          [content]="notification.content">
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

}
