import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  exportAs: 'ngxNotificationContainer',
  selector: 'ngx-notification-container',
  template: ' <div class="notification-container"></div> ',
  host: { class: 'ngx-notification-container' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class NotificationContainerComponent {}
