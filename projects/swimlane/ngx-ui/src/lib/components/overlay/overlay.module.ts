import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayComponent } from './overlay.component';
import { OverlayService } from './overlay.service';
import { InjectionService } from '../../services/injection/injection.service';
import { ResizeOverlayComponent } from './resize-overlay.component';
import { IconModule } from '../icon/icon.module';
import { HotkeysService } from '../hotkeys/hotkeys.service';

@NgModule({
  declarations: [OverlayComponent, ResizeOverlayComponent],
  providers: [OverlayService, InjectionService, OverlayService, HotkeysService],
  exports: [OverlayComponent, ResizeOverlayComponent],
  imports: [CommonModule, IconModule],
  entryComponents: [OverlayComponent, ResizeOverlayComponent],
})
export class OverlayModule {}
