import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from './dropdown.component';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { InViewportModule } from 'ng-in-viewport';

@NgModule({
  declarations: [DropdownComponent, DropdownToggleDirective, DropdownMenuDirective],
  exports: [DropdownComponent, DropdownToggleDirective, DropdownMenuDirective],
  imports: [CommonModule, InViewportModule]
})
export class DropdownModule {}
