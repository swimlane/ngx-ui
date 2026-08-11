import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InViewportModule } from '../../directives/in-viewport/in-viewport.module';

import { InputModule } from '../input/input.module';
import { MultiDimensionSelectionComponent } from './multi-dimension-selection.component';
import { SelectionListModule } from './selection-list/selection-list.module';

@NgModule({
  imports: [FormsModule, InputModule, InViewportModule, SelectionListModule],
  declarations: [MultiDimensionSelectionComponent],
  exports: [MultiDimensionSelectionComponent]
})
export class MultiDimensionSelectionModule {}
