import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RadioButtonModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { RadioPageRoutingModule } from './radio-page-routing.module';
import { RadioPageComponent } from './radio-page.component';

@NgModule({
  declarations: [RadioPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, RadioButtonModule, RadioPageRoutingModule]
})
export class RadioPageModule {}
