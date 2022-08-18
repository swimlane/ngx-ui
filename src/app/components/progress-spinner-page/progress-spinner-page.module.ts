import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  InputModule,
  ProgressSpinnerModule,
  SectionModule,
  SelectModule,
  TabsModule,
  ToggleModule
} from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { ProgressSpinnerPageComponent } from './progress-spinner-page.component';
import { ProgressSpinnerPageRoutingModule } from './progress-spinner-page-routing.module';

@NgModule({
  declarations: [ProgressSpinnerPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    ProgressSpinnerModule,
    SelectModule,
    InputModule,
    ToggleModule,
    ProgressSpinnerPageRoutingModule,
    TabsModule
  ]
})
export class ProgressSpinnerPageModule {}
