import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ControlsPageRoutingModule } from './controls-page-routing.module';
import {
  ButtonModule,
  DateTimeModule,
  IconModule,
  InputModule,
  RadioButtonModule,
  SectionModule,
  SelectModule,
  ToggleModule
} from '../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../common/prism/prism.module';
import { ControlsPageComponent } from './controls-page.component';

@NgModule({
  declarations: [ControlsPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    InputModule,
    SelectModule,
    ButtonModule,
    DateTimeModule,
    ToggleModule,
    IconModule,
    RadioButtonModule,
    ControlsPageRoutingModule
  ]
})
export class ControlsPageModule {}
