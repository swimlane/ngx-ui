import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsPageRoutingModule } from './tags-page-routing.module';
import { SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { TagsPageComponent } from './tags-page.component';

@NgModule({
  declarations: [TagsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TagsPageRoutingModule]
})
export class TagsPageModule {}
