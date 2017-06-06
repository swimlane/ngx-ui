import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeysComponent } from './hotkeys.component';

@NgModule({
  declarations: [HotkeysComponent],
  exports: [HotkeysComponent],
  imports: [CommonModule]
})
export class HotkeysModule { }
