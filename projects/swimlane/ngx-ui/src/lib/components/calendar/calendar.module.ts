import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [CommonModule, FormsModule, MomentModule, FlexLayoutModule]
})
export class CalendarModule {}
