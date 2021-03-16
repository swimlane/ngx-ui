import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/injection';
import { OverlayModule } from '@swimlane/ngx-ui/overlay';
import { DialogComponent } from './dialog.component';
import { DialogService } from './services';

@NgModule({
  imports: [CommonModule, OverlayModule],
  providers: [DialogService, InjectionService],
  declarations: [DialogComponent],
  exports: [DialogComponent]
})
export class DialogModule {}
