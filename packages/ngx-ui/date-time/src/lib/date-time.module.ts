import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from '@swimlane/ngx-ui/calendar';
import { DialogModule } from '@swimlane/ngx-ui/dialog';
import { InputModule } from '@swimlane/ngx-ui/input';
import { TimeZoneModule } from '@swimlane/ngx-ui/pipes/time-zone';
import { MomentModule } from 'ngx-moment';
import { DateTimeComponent } from './date-time.component';

@NgModule({
  imports: [CommonModule, DialogModule, InputModule, FormsModule, MomentModule, TimeZoneModule, CalendarModule],
  declarations: [DateTimeComponent],
  exports: [DateTimeComponent]
})
export class DateTimeModule {}
