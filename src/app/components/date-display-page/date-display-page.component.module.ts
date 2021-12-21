import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateDisplayPageComponent } from './date-display-page.component.component';
import { CalendarPageRoutingModule } from './date-display-page-routing.module';
import { DateDisplayModule } from '@swimlane/ngx-ui/components/date-display/date-display.module';

@NgModule({
  declarations: [DateDisplayPageComponent],
  imports: [CommonModule, CalendarPageRoutingModule, DateDisplayModule]
})
export class DateDisplayPageModule {}
