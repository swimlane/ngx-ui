import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';
import { TooltipModule } from '../tooltip/tooltip.module';

import { FilterComponent } from './filter.component';
import { SelectModule } from '../select/select.module';
import { DropdownModule } from '../dropdown/dropdown.module';

export { FilterCustomDropdown } from './filter.custom-component.interface';
@NgModule({
  declarations: [FilterComponent],
  exports: [FilterComponent],
  imports: [CommonModule, InViewportModule, TooltipModule, SelectModule, DropdownModule]
})
export class FiltersModule {}
