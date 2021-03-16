import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { TagsPageRoutingModule } from './tags-page-routing.module';
import { TagsPageComponent } from './tags-page.component';

@NgModule({
  declarations: [TagsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TagsPageRoutingModule]
})
export class TagsPageModule {}
