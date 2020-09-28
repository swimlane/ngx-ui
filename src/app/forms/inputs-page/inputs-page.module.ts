import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputsPageRoutingModule } from './inputs-page-routing.module';
import {
  IconModule,
  InputModule,
  SectionModule,
  TabsModule
} from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { InputsPageComponent } from './inputs-page.component';

@NgModule({
  declarations: [InputsPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    InputModule,
    TabsModule,
    IconModule,
    InputsPageRoutingModule
  ]
})
export class InputsPageModule {}
