import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { ScrollbarsPageRoutingModule } from './scrollbars-page-routing.module';
import { ScrollbarsPageComponent } from './scrollbars-page.component';

@NgModule({
  declarations: [ScrollbarsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TabsModule, IconModule, ScrollbarsPageRoutingModule]
})
export class ScrollbarsPageModule {}
