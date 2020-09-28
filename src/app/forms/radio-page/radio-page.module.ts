import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RadioPageRoutingModule } from './radio-page-routing.module';
import { RadioButtonModule, SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { RadioPageComponent } from './radio-page.component';

@NgModule({
  declarations: [RadioPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, RadioButtonModule, RadioPageRoutingModule]
})
export class RadioPageModule {}
