import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablePageRoutingModule } from './table-page-routing.module';
import { SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { TablePageComponent } from './table-page.component';

@NgModule({
  declarations: [TablePageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TablePageRoutingModule]
})
export class TablePageModule {}
