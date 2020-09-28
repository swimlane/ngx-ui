import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsPageRoutingModule } from './lists-page-routing.module';
import { SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { ListsPageComponent } from './lists-page.component';

@NgModule({
  declarations: [ListsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, ListsPageRoutingModule]
})
export class ListsPageModule {}
