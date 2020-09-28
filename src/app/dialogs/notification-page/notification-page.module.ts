import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationPageRoutingModule } from './notification-page-routing.module';
import { NotificationModule, SectionModule, TabsModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { NotificationPageComponent } from './notification-page.component';

@NgModule({
  declarations: [NotificationPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, NotificationModule, TabsModule, NotificationPageRoutingModule]
})
export class NotificationPageModule {}
