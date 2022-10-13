import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SectionModule, SelectModule, StepperModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { StepperPageRoutingModule } from './stepper-page-routing.module';
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
    StepperPageRoutingModule,
    TabsModule
  ]
})
export class StepperPageModule {}
