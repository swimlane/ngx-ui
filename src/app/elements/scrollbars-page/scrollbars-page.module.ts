import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollbarsPageRoutingModule } from './scrollbars-page-routing.module';
import { IconModule, SectionModule, TabsModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { ScrollbarsPageComponent } from './scrollbars-page.component';

@NgModule({
  declarations: [ScrollbarsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TabsModule, IconModule, ScrollbarsPageRoutingModule]
})
export class ScrollbarsPageModule {}
