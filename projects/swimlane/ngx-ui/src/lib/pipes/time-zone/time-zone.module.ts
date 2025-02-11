import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeZoneFormatPipe, TimeZonePipe } from './time-zone.pipe';

@NgModule({
  declarations: [TimeZonePipe, TimeZoneFormatPipe],
  exports: [TimeZonePipe, TimeZoneFormatPipe],
  imports: [CommonModule]
})
export class TimeZoneModule {}
