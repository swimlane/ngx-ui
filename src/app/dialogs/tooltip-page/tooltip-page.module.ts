import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipPageRoutingModule } from './tooltip-page-routing.module';
import { SectionModule, TooltipModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { TooltipPageComponent } from './tooltip-page.component';

@NgModule({
  declarations: [TooltipPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TooltipModule, TooltipPageRoutingModule]
})
export class TooltipPageModule {}
