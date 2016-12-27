import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InjectionService } from '../../services';

import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { NotificationContainerComponent } from './notification-container.component';

@NgModule({
  declarations: [NotificationComponent, NotificationContainerComponent],
  exports: [NotificationComponent, NotificationContainerComponent],
  providers: [NotificationService, InjectionService],
  imports: [CommonModule],
  entryComponents: [NotificationComponent, NotificationContainerComponent]
})
export class NotificationModule { }
