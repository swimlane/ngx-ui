import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayComponent } from './overlay.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OverlayComponent],
  exports: [OverlayComponent],
})
export class OverlayModule {}
