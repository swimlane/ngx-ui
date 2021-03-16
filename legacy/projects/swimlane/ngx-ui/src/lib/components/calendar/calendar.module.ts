import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { CalendarComponent } from './calendar.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [CommonModule, FormsModule, MomentModule, PipesModule]
})
export class CalendarModule {}
