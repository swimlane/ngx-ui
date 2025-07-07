import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiltersModule, SectionModule, SelectModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { SelectsPageRoutingModule } from './filters-page-routing.module';
import { FiltersPageComponent, MyCustomComponent } from './filters-page.component';
import { DateRangePickerModule } from '@swimlane/ngx-ui/components/date-range-calendar/date-range.module';

@NgModule({
  declarations: [FiltersPageComponent, MyCustomComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    FiltersModule,
    SelectModule,
    SelectsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule, DateRangePickerModule
  ]
})
export class FiltersPageModule {}
