import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../common/prism/prism.module';

import { AnimationsPageComponent } from './animations-page.component';
import { AnimationsPageRoutingModule } from './animations-page.routing.module';

@NgModule({
  declarations: [AnimationsPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, ButtonModule, AnimationsPageRoutingModule]
})
export class AnimationsPageModule {}
