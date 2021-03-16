import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InjectionService } from '../../services/injection/injection.service';
import { OverlayModule } from '../overlay/overlay.module';
import { InputModule } from '../input/input.module';

import { AlertComponent } from './alert/alert.component';
import { DialogComponent } from './dialog.component';
import { LongPressButtonModule } from '../long-press/long-press-button.module';

@NgModule({
  declarations: [DialogComponent, AlertComponent],
  exports: [DialogComponent, AlertComponent],
  providers: [InjectionService],
  imports: [CommonModule, OverlayModule, InputModule, FormsModule, LongPressButtonModule],
  entryComponents: [DialogComponent, AlertComponent]
})
export class DialogModule {}
