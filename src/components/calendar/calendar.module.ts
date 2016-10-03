import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputModule } from '../input';
import { DialogModule } from '../dialog';

import { CalendarComponent } from './calendar.component';
import { CalendarInputComponent } from './calendar-input.component';

@NgModule({
  declarations: [CalendarComponent, CalendarInputComponent],
  exports: [CalendarComponent, CalendarInputComponent],
  imports: [CommonModule, FormsModule, InputModule, DialogModule]
})
export class CalendarModule { }
