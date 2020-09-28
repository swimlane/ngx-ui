import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ButtonModule,
  DateTimeModule,
  IconModule,
  InputModule,
  RadioButtonModule,
  SectionModule,
  SelectModule,
  ToggleModule
} from '@swimlane/ngx-ui';
import { PrismModule } from '../common/prism/prism.module';

import { ControlsPageComponent } from './controls-page.component';
import { ControlsPageRoutingModule } from './controls-page-routing.module';

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
