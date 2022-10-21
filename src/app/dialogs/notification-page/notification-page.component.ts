import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationService, NotificationStyleType, NotificationType } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationPageComponent {
  readonly NotificationType = NotificationType;
  readonly NotificationStyleType = NotificationStyleType;

  constructor(readonly notificationService: NotificationService) {}

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
