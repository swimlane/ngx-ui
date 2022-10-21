import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule, CheckboxModule, SectionModule, SplitModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { SplitPageRoutingModule } from './split-page-routing.module';
import { SplitPageComponent } from './split-page.component';

@NgModule({
  declarations: [SplitPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    SplitModule,
    ButtonModule,
    CheckboxModule,
    SplitPageRoutingModule,
    TabsModule
  ]
})
export class SplitPageModule {}
