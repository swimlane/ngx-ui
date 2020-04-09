import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { CalendarModule } from '../calendar/calendar.module';
import { DialogModule } from '../dialog/dialog.module';
import { InputModule } from '../input/input.module';
import { ToggleModule } from '../toggle/toggle.module';
import { PipesModule } from '../../pipes/pipes.module';

import { DateTimeComponent } from './date-time.component';

@NgModule({
  declarations: [DateTimeComponent],
  exports: [DateTimeComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    DialogModule,
    MomentModule,
    CalendarModule,
    ToggleModule,
    FlexLayoutModule,
    PipesModule
  ]
})
export class DateTimeModule {}
