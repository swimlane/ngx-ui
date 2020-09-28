import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectsPageRoutingModule } from './selects-page-routing.module';
import { SectionModule, SelectModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { SelectsPageComponent } from './selects-page.component';

@NgModule({
  declarations: [SelectsPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, SelectModule, SelectsPageRoutingModule]
})
export class SelectsPageModule {}
