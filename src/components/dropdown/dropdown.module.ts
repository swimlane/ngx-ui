import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from './dropdown.component';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';

@NgModule({
  declarations: [DropdownComponent, DropdownToggleDirective, DropdownMenuDirective],
  exports: [DropdownComponent, DropdownToggleDirective, DropdownMenuDirective],
  imports: [CommonModule]
})
export class DropdownModule { }
