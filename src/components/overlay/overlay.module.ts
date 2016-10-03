import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';

@NgModule({
  declarations: [OverlayComponent],
  exports: [OverlayComponent],
  imports: [CommonModule]
})
export class OverlayModule { }
