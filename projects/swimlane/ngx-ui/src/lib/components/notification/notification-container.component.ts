import { Component } from '@angular/core';

@Component({
  exportAs: 'ngxNotificationContainer',
  selector: 'ngx-notification-container',
  template: `<div class="notification-container"></div>`,
  host: { class: 'ngx-notification-container' }
})
export class NotificationContainerComponent {}
