import { Component } from '@angular/core';
import { NotificationService, NotificationStyleType, NotificationType } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html'
})
export class NotificationPageComponent {
  readonly NotificationType = NotificationType;
  readonly NotificationStyleType = NotificationStyleType;

  constructor(readonly notificationService: NotificationService) {}
}
