import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StepperPageRoutingModule } from './stepper-page-routing.module';
import { SectionModule, SelectModule, StepperModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { StepperPageComponent } from './stepper-page.component';

@NgModule({
  declarations: [StepperPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    StepperModule,
    SelectModule,
    StepperPageRoutingModule
  ]
})
export class StepperPageModule {}
