import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProgressSpinnerPageRoutingModule } from './progress-spinner-page-routing.module';
import {
  InputModule,
  ProgressSpinnerModule,
  SectionModule,
  SelectModule
} from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { ProgressSpinnerPageComponent } from './progress-spinner-page.component';

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
    ProgressSpinnerPageRoutingModule
  ]
})
export class ProgressSpinnerPageModule {}
