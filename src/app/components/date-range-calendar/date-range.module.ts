import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateRangePickerComponent } from './date-range-picker.component';
import { NgxUIModule, TooltipModule } from '@swimlane/ngx-ui';

@NgModule({
  declarations: [DateRangePickerComponent],
  exports: [
    DateRangePickerComponent // Export so other modules (like AppModule) can use it
  ],
  providers: [], // No specific providers needed for this component
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUIModule,
    TooltipModule // Required for form handling
  ]
})
export class DateRangePickerModule {}
