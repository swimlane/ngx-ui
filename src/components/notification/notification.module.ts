import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InjectionService } from '../../services';

import { NotificationContainerComponent } from './notification-container.component';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [NotificationComponent, NotificationContainerComponent],
  exports: [NotificationComponent, NotificationContainerComponent],
  providers: [NotificationService, InjectionService],
  imports: [CommonModule],
  entryComponents: [NotificationContainerComponent]
})
export class NotificationModule { }
