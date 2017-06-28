import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeysComponent } from './hotkeys.component';
import { HotkeysService } from './hotkeys.service';

export * from './hotkeys.service';
export * from './hotkeys.component';

@NgModule({
  declarations: [HotkeysComponent],
  exports: [HotkeysComponent],
  providers: [HotkeysService],
  imports: [CommonModule]
})
export class HotkeysModule { }
