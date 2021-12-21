import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateDisplayModule } from '@swimlane/ngx-ui/components/date-display/date-display.module';
import { SectionModule } from '@swimlane/ngx-ui/components/section/section.module';
import { PrismModule } from '../../common/prism/prism.module';

import { DateDisplayPageComponent } from './date-display-page.component.component';
import { CalendarPageRoutingModule } from './date-display-page-routing.module';

@NgModule({
  declarations: [DateDisplayPageComponent],
  imports: [CommonModule, CalendarPageRoutingModule, DateDisplayModule, PrismModule, SectionModule]
})
export class DateDisplayPageModule {}
