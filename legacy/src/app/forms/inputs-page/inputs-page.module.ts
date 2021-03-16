import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IconModule, InputModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { InputsPageComponent } from './inputs-page.component';
import { InputsPageRoutingModule } from './inputs-page-routing.module';

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
