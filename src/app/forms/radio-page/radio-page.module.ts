import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RadioButtonModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { RadioPageRoutingModule } from './radio-page-routing.module';
import { RadioPageComponent } from './radio-page.component';

@NgModule({
  declarations: [RadioPageComponent],
  imports: [
    CommonModule,
    PrismModule,
    SectionModule,
    RadioButtonModule,
    RadioPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule
  ]
})
export class RadioPageModule {}
