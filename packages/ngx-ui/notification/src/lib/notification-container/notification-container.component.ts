import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ngx-notification-container',
  exportAs: 'ngxNotificationContainer',
  template: `
    <div class="notification-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationContainerComponent {
  @HostBinding('class.ngx-notification-container') hostClass = true;
}
