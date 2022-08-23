import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionModule, TabsModule, TooltipModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { TooltipPageRoutingModule } from './tooltip-page-routing.module';
import { TooltipPageComponent } from './tooltip-page.component';

@NgModule({
  declarations: [TooltipPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TooltipModule, TooltipPageRoutingModule, TabsModule]
})
export class TooltipPageModule {}
