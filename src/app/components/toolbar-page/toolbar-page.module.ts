import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionModule, TabsModule, ToolbarModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { ToolbarPageRoutingModule } from './toolbar-page-routing.module';
import { ToolbarPageComponent } from './toolbar-page.component';

@NgModule({
  declarations: [ToolbarPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, ToolbarModule, ToolbarPageRoutingModule, TabsModule]
})
export class ToolbarPageModule {}
