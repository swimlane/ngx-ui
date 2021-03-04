import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { OverlayComponent } from './overlay.component';
import { InjectionService } from '../../services/injection/injection.service';
import { ResizeOverlayComponent } from './resize-overlay.component';
import { IconModule } from '../icon/icon.module';
import { HotkeysService } from '../hotkeys/hotkeys.service';

@NgModule({
  declarations: [OverlayComponent, ResizeOverlayComponent],
  providers: [InjectionService, HotkeysService],
  exports: [OverlayComponent, ResizeOverlayComponent],
  imports: [CommonModule, IconModule, LayoutModule],
  entryComponents: [OverlayComponent, ResizeOverlayComponent]
})
export class OverlayModule {}
