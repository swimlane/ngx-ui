import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InjectionService } from '../../services';
import { OverlayModule } from '../overlay';

import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
  declarations: [DialogComponent],
  exports: [DialogComponent],
  providers: [DialogService, InjectionService],
  imports: [CommonModule, OverlayModule],
  entryComponents: [DialogComponent]
})
export class DialogModule { }
