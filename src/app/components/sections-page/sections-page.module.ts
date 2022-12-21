import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { SectionsPageRoutingModule } from './sections-page-routing.module';
import { SectionsPageComponent } from './sections-page.component';

@NgModule({
  declarations: [SectionsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, SectionsPageRoutingModule, TabsModule]
})
export class SectionsPageModule {}
