import { NgModule } from '@angular/core';
import { DateRangePickerComponent } from './date-range-picker.component';
import { InputModule } from '../input/input.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from '../calendar/calendar.module';

@NgModule({
  declarations: [DateRangePickerComponent],
  exports: [
    DateRangePickerComponent // Export so other modules (like AppModule) can use it
  ],
  providers: [], // No specific providers needed for this component
  imports: [
    InputModule,DropdownModule, ButtonModule, IconModule, TooltipModule, CommonModule, FormsModule, CalendarModule
  ]
})
export class DateRangePickerModule {}
