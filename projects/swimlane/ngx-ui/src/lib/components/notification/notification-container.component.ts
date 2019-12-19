import { Component } from '@angular/core';

@Component({
  selector: 'ngx-notification-container',
  template: `
    <div class="notification-container"></div>
  `,
  host: {
    class: 'ngx-notification-container'
  }
})
export class NotificationContainerComponent {}
