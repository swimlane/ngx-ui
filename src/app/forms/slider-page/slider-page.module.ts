import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SectionModule, SliderModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { SliderPageRoutingModule } from './slider-page-routing.module';
import { SliderPageComponent } from './slider-page.component';

@NgModule({
  declarations: [SliderPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, SliderModule, SliderPageRoutingModule, TabsModule]
})
export class SliderPageModule {}
