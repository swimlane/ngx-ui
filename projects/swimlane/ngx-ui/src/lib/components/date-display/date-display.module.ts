import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MomentModule } from 'ngx-moment';

import { TimeZoneModule } from '../../pipes/time-zone/time-zone.module';
import { IconModule } from '../icon/icon.module';
import { TooltipModule } from '../tooltip/tooltip.module';

import { NgxDateDisplayComponent } from './date-display.component';

@NgModule({
  declarations: [NgxDateDisplayComponent],
  exports: [NgxDateDisplayComponent],
  imports: [CommonModule, MomentModule, TimeZoneModule, TooltipModule, IconModule]
})
export class DateDisplayModule {}
