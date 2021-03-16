import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/injection';
import { NotificationContainerComponent } from './notification-container/notification-container.component';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [NotificationComponent, NotificationContainerComponent],
  providers: [NotificationService, InjectionService],
  exports: [NotificationComponent, NotificationContainerComponent],
})
export class NotificationModule {}
