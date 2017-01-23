import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InjectionService } from '../../services';
import { OverlayModule } from '../overlay';

import { AlertComponent, AlertService } from './alert';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
  declarations: [DialogComponent, AlertComponent],
  exports: [DialogComponent, AlertComponent],
  providers: [DialogService, AlertService, InjectionService],
  imports: [CommonModule, OverlayModule],
  entryComponents: [DialogComponent, AlertComponent]
})
export class DialogModule { }
