import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MomentModule } from 'ngx-moment';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { TimeZoneModule } from '../../pipes/time-zone/time-zone.module';
import { IconModule } from '../icon/icon.module';
import { TooltipModule } from '../tooltip/tooltip.module';

import { NgxTimeDisplayComponent } from './time-display.component';

@NgModule({
  declarations: [NgxTimeDisplayComponent],
  exports: [NgxTimeDisplayComponent],
  imports: [CommonModule, MomentModule, TimeZoneModule, TooltipModule, IconModule, ClipboardModule]
})
export class TimeDisplayModule {}
