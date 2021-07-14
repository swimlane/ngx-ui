import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/common';
import { OverlayComponent } from './overlay.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OverlayComponent],
  exports: [OverlayComponent],
  providers: [InjectionService],
})
export class OverlayModule {}
