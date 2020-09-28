import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayPageRoutingModule } from './overlay-page-routing.module';
import { OverlayModule, SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { OverlayPageComponent } from './overlay-page.component';

@NgModule({
  declarations: [OverlayPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, OverlayModule, OverlayPageRoutingModule]
})
export class OverlayPageModule {}
