import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SectionModule, SelectModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { SelectsPageRoutingModule } from './selects-page-routing.module';
import { SelectsPageComponent } from './selects-page.component';

@NgModule({
  declarations: [SelectsPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    SelectModule,
    SelectsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule
  ]
})
export class SelectsPageModule {}
