import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { CalendarModule } from '../calendar';
import { DialogModule } from '../dialog';
import { InputModule } from '../input';
import { ToggleModule } from '../toggle';
import { DateTimeComponent } from './date-time.component';
import { PipesModule } from '../../pipes';

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
