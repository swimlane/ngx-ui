import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeZonePipe } from './time-zone.pipe';

@NgModule({
  declarations: [TimeZonePipe],
  exports: [TimeZonePipe],
  imports: [CommonModule]
})
export class TimeZoneModule {}
