import { Component } from '@angular/core';
import { NotificationService } from '../../../../projects/swimlane/ngx-ui/src/public_api';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html'
})
export class NotificationPageComponent {
  constructor(public notificationService: NotificationService) {}
}
