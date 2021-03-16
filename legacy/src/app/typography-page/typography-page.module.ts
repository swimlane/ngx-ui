import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionModule } from '@swimlane/ngx-ui';

import { PrismModule } from '../common/prism/prism.module';

import { TypographyPageRoutingModule } from './typography-page-routing.module';
import { TypographyPageComponent } from './typography-page.component';

@NgModule({
  declarations: [TypographyPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TypographyPageRoutingModule]
})
export class TypographyPageModule {}
