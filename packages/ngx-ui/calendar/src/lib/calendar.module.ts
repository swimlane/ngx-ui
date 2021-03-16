import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeZoneModule } from '@swimlane/ngx-ui/pipes/time-zone';
import { MomentModule } from 'ngx-moment';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [CommonModule, TimeZoneModule, MomentModule],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class CalendarModule {}
