import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [CommonModule, FormsModule]
})
export class CalendarModule { }
