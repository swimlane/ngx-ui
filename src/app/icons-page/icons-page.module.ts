import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsPageRoutingModule } from './icons-page-routing.module';
import { IconModule, SectionModule } from '../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../common/prism/prism.module';
import { IconsPageComponent } from './icons-page.component';

@NgModule({
  declarations: [IconsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, IconModule, IconsPageRoutingModule]
})
export class IconsPageModule {}
