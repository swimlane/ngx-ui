import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/injection';
import { OverlayComponent } from './overlay.component';
import { OverlayService } from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [OverlayComponent],
  providers: [OverlayService, InjectionService],
  exports: [OverlayComponent],
})
export class OverlayModule {}
