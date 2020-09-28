import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismModule } from '../../common/prism/prism.module';
import { TabsModule, SectionModule, TreeModule } from '@swimlane/ngx-ui';

import { TreePageRoutingModule } from './tree-page-routing.module';
import { TreePageComponent } from './tree-page.component';

@NgModule({
  declarations: [TreePageComponent],
  imports: [CommonModule, TabsModule, SectionModule, TreeModule, PrismModule, TreePageRoutingModule]
})
export class TreePageModule {}
