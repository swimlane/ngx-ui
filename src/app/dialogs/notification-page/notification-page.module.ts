import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { NotificationPageRoutingModule } from './notification-page-routing.module';
import { NotificationPageComponent } from './notification-page.component';

@NgModule({
  declarations: [NotificationPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, NotificationModule, TabsModule, NotificationPageRoutingModule]
})
export class NotificationPageModule {}
