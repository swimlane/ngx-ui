import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../common/prism/prism.module';

import { IconsPageRoutingModule } from './icons-page-routing.module';
import { IconsPageComponent } from './icons-page.component';

@NgModule({
  declarations: [IconsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, IconModule, IconsPageRoutingModule]
})
export class IconsPageModule {}
