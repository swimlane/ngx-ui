import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule, HotkeysModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { HotkeysPageRoutingModule } from './hotkeys-page-routing.module';
import { HotkeysPageComponent } from './hotkeys-page.component';

@NgModule({
  declarations: [HotkeysPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, HotkeysModule, DialogModule, HotkeysPageRoutingModule]
})
export class HotkeysPageModule {}
