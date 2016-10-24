import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { InputModule } from '../input';
import { DialogModule } from '../dialog';
import { CalendarModule } from '../calendar';

import { DateTimeComponent } from './date-time.component';

@NgModule({
  declarations: [DateTimeComponent],
  exports: [DateTimeComponent],
  imports: [
    CommonModule, FormsModule, InputModule,
    DialogModule, MomentModule, CalendarModule
  ]
})
export class DateTimeModule { }
