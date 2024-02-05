import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InjectionService } from '../../services/injection/injection.service';

import { NotificationComponent } from './notification.component';
import { NotificationContainerComponent } from './notification-container.component';

@NgModule({
  declarations: [NotificationComponent, NotificationContainerComponent],
  exports: [NotificationComponent, NotificationContainerComponent],
  providers: [InjectionService],
  imports: [CommonModule]
})
export class NotificationModule {}
