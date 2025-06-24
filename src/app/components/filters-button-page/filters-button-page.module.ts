import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterButtonModule, FilterSelectModule, SectionModule, SelectModule, TabsModule } from '@swimlane/ngx-ui';
import { FiltersButtonPageComponent } from './filters-button-page.component';
import { FilterButtonPageRoutingModule } from './filters-button-page-routing.module';
import { PrismModule } from 'src/app/common/prism/prism.module';

@NgModule({
  declarations: [FiltersButtonPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    FilterSelectModule,
    FilterButtonModule,
    SelectModule,
    FilterButtonPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule
  ]
})
export class FiltersButtonPageModule {}
