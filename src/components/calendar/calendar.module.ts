import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputModule } from '../input';

import { CalendarComponent } from './calendar.component';
import { CalendarInputComponent } from './calendar-input.component';

@NgModule({
  declarations: [CalendarComponent, CalendarInputComponent],
  exports: [CalendarComponent, CalendarInputComponent],
  imports: [CommonModule, FormsModule, InputModule]
})
export class CalendarModule { }
