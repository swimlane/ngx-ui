import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { AutofocusModule } from '@swimlane/ngx-ui/autofocus';
import { AutosizeModule } from '@swimlane/ngx-ui/autosize';
import { CalendarModule } from '@swimlane/ngx-ui/calendar';
import { InputModule } from '@swimlane/ngx-ui/input';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { MarginlessModule } from '@swimlane/ngx-ui/marginless';
import { SizeModule } from '@swimlane/ngx-ui/size';
import { TimeZoneModule } from '@swimlane/ngx-ui/time-zone';
import { MomentModule } from 'ngx-moment';
import { DateTimeComponent } from './date-time.component';

@NgModule({
  imports: [
    CommonModule,
    TimeZoneModule,
    MomentModule,
    CalendarModule,
    FormsModule,
    InputModule,
    InputAttributeModule,
    AppearanceModule,
    SizeModule,
    AutosizeModule,
    AutofocusModule,
    MarginlessModule,
  ],
  declarations: [DateTimeComponent],
  exports: [DateTimeComponent],
})
export class DateTimeModule {}
