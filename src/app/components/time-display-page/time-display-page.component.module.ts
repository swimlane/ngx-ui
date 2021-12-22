import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateDisplayModule } from '@swimlane/ngx-ui/components/time-display/time-display.module';
import { SectionModule } from '@swimlane/ngx-ui/components/section/section.module';
import { PrismModule } from '../../common/prism/prism.module';

import { TimeDisplayPageComponent } from './time-display-page.component.component';
import { CalendarPageRoutingModule } from './time-display-page-routing.module';

@NgModule({
  declarations: [TimeDisplayPageComponent],
  imports: [CommonModule, CalendarPageRoutingModule, DateDisplayModule, PrismModule, SectionModule]
})
export class DateDisplayPageModule {}
