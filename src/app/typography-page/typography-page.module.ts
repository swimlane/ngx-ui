/* eslint-disable import/prefer-default-export */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SectionModule } from '@swimlane/ngx-ui';

import { PrismModule } from '../common/prism/prism.module';

import { TypographyPageComponent } from './typography-page.component';
import { TypographyPageRoutingModule } from './typography-page-routing.module';

@NgModule({
  declarations: [TypographyPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, TypographyPageRoutingModule]
})
export class TypographyPageModule {}
