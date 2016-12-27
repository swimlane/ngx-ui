import { Component, Input } from '@angular/core';
import { NotificationType } from './notification.type';

@Component({
  selector: 'ngx-notification-container',
  template: `
    <div class="notification-container"></div>
  `,
  host: {
    class: 'ngx-notification-container'
  }
})
export class NotificationContainerComponent { }
