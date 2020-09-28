import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarPageRoutingModule } from './toolbar-page-routing.module';
import { SectionModule, ToolbarModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { ToolbarPageComponent } from './toolbar-page.component';

@NgModule({
  declarations: [ToolbarPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, ToolbarModule, ToolbarPageRoutingModule]
})
export class ToolbarPageModule {}
