import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { OverlayPageRoutingModule } from './overlay-page-routing.module';
import { OverlayPageComponent } from './overlay-page.component';

@NgModule({
  declarations: [OverlayPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, OverlayModule, OverlayPageRoutingModule, TabsModule]
})
export class OverlayPageModule {}
