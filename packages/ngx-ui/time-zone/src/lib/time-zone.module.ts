import { NgModule } from '@angular/core';
import { TimeZonePipe } from './time-zone.pipe';

@NgModule({
  declarations: [TimeZonePipe],
  exports: [TimeZonePipe],
})
export class TimeZoneModule {}
