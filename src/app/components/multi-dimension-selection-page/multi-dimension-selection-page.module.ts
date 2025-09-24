import { NgModule } from '@angular/core';
import { MultiDimensionSelectionPageComponent } from './multi-dimension-selection-page.component';
import { FiltersModule, MultiDimensionSelectionModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { MultiDimensionSelectionPageRoutingModule } from './multi-dimension-selection-page-routing.module';
import { PrismModule } from '../../common/prism/prism.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MultiDimensionSelectionPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    FiltersModule,
    MultiDimensionSelectionModule,
    MultiDimensionSelectionPageRoutingModule,
    PrismModule,
    SectionModule,
    TabsModule
  ],
  exports: [MultiDimensionSelectionPageRoutingModule]
})
export class MultiDimensionSelectionPageModule {}
