import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeZonePipe } from './time-zone.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TimeZonePipe],
  exports: [TimeZonePipe]
})
export class TimeZoneModule {}
