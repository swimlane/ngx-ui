import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { PlusMenuComponent } from './plus-menu.component';
import { HotkeysModule } from '../hotkeys/hotkeys.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  imports: [CommonModule, IconModule, HotkeysModule, TooltipModule],
  providers: [],
  exports: [PlusMenuComponent],
  declarations: [PlusMenuComponent]
})
export class PlusMenuModule {}
