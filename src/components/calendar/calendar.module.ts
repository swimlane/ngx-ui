import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InputModule } from '../input';

import { CalendarComponent } from './calendar.component';
import { CalendarInputComponent } from './calendar-input.component';

@NgModule({
  declarations: [CalendarComponent, CalendarInputComponent],
  exports: [CalendarComponent, CalendarInputComponent],
  imports: [BrowserModule, FormsModule, InputModule]
})
export class CalendarModule { }
