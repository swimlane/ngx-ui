import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { PlusMenuComponent } from './plus-menu.component';
import { HotkeysModule } from '../hotkeys/hotkeys.module';

@NgModule({
  imports: [CommonModule, IconModule, HotkeysModule],
  providers: [],
  exports: [PlusMenuComponent],
  declarations: [PlusMenuComponent]
})
export class PlusMenuModule {}
