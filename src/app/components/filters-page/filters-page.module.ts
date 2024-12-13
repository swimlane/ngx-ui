import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterSelectModule, SectionModule, SelectModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { SelectsPageRoutingModule } from './filters-page-routing.module';
import { FiltersPageComponent } from './filters-page.component';

@NgModule({
  declarations: [FiltersPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    FilterSelectModule,
    SelectModule,
    SelectsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule
  ]
})
export class FiltersPageModule {}
