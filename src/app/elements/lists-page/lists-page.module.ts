import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { ListsPageRoutingModule } from './lists-page-routing.module';
import { ListsPageComponent } from './lists-page.component';

@NgModule({
  declarations: [ListsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, ListsPageRoutingModule]
})
export class ListsPageModule {}
