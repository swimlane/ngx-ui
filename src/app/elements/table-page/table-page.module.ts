import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { TablePageRoutingModule } from './table-page-routing.module';
import { TablePageComponent } from './table-page.component';

@NgModule({
  declarations: [TablePageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TablePageRoutingModule]
})
export class TablePageModule {}
