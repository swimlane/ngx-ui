import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InjectionService } from '../../services/injection.service';
import { OverlayModule } from '../overlay/overlay.module';
import { InputModule } from '../input/input.module';

import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
  declarations: [DialogComponent, AlertComponent],
  exports: [DialogComponent, AlertComponent],
  providers: [DialogService, AlertService, InjectionService],
  imports: [CommonModule, OverlayModule, InputModule, FormsModule],
  entryComponents: [DialogComponent, AlertComponent]
})
export class DialogModule {}
