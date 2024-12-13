import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';
import { TooltipModule } from '../tooltip/tooltip.module';

import { FilterSelectComponent } from './filter-select.component';
import { SelectModule } from '../select/select.module';

@NgModule({
  declarations: [FilterSelectComponent],
  exports: [FilterSelectComponent],
  imports: [CommonModule, InViewportModule, TooltipModule, SelectModule]
})
export class FilterSelectModule {}
