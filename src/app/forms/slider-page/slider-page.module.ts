import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderPageRoutingModule } from './slider-page-routing.module';
import { SectionModule, SliderModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { SliderPageComponent } from './slider-page.component';

@NgModule({
  declarations: [SliderPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, SliderModule, SliderPageRoutingModule]
})
export class SliderPageModule {}
