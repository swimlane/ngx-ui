import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeDisplayModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { TimeDisplayPageComponent } from './time-display-page.component.component';
import { CalendarPageRoutingModule } from './time-display-page-routing.module';

@NgModule({
  declarations: [TimeDisplayPageComponent],
  imports: [CommonModule, CalendarPageRoutingModule, TimeDisplayModule, PrismModule, SectionModule, TabsModule]
})
export class DateDisplayPageModule {}
