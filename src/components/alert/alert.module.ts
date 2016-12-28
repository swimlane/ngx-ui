import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from '../dialog';
import { AlertService } from './alert.service';

@NgModule({
  declarations: [],
  exports: [],
  providers: [AlertService],
  imports: [CommonModule, DialogModule]
})
export class AlertModule { }
