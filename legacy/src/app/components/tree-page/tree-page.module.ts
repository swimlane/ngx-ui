import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismModule } from '../../common/prism/prism.module';

import { TabsModule, SectionModule, TreeModule, JSONTreeModule } from '@swimlane/ngx-ui';

import { TreePageRoutingModule } from './tree-page-routing.module';
import { TreePageComponent } from './tree-page.component';

@NgModule({
  declarations: [TreePageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TabsModule, TreeModule, JSONTreeModule, TreePageRoutingModule]
})
export class TreePageModule {}
