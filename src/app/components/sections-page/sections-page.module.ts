import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsPageRoutingModule } from './sections-page-routing.module';
import { SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { SectionsPageComponent } from './sections-page.component';

@NgModule({
  declarations: [SectionsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, SectionsPageRoutingModule]
})
export class SectionsPageModule {}
