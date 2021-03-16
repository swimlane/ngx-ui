import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownMenuDirective, DropdownToggleDirective } from './directives';
import { DropdownComponent } from './dropdown.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DropdownMenuDirective, DropdownToggleDirective, DropdownComponent],
  exports: [DropdownMenuDirective, DropdownToggleDirective, DropdownComponent]
})
export class DropdownModule {}
