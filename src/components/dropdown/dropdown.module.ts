import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DropdownDirective } from './dropdown.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';

@NgModule({
  declarations: [DropdownDirective, DropdownToggleDirective, DropdownMenuDirective],
  exports: [DropdownDirective, DropdownToggleDirective, DropdownMenuDirective],
  imports: [BrowserModule]
})
export class DropdownModule { }
