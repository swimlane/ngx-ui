import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/common';
import { NotificationContainerComponent } from './notification-container/notification-container.component';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NotificationComponent, NotificationContainerComponent],
  providers: [InjectionService],
  exports: [NotificationComponent, NotificationContainerComponent],
})
export class NotificationModule {}
