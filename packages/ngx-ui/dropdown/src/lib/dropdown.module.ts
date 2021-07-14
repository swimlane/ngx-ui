import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';
import { DropdownMenuDirective, DropdownToggleDirective } from './directives';
import { DropdownComponent } from './dropdown.component';

@NgModule({
  imports: [CommonModule, InViewportModule],
  declarations: [
    DropdownComponent,
    DropdownMenuDirective,
    DropdownToggleDirective,
  ],
  exports: [DropdownComponent, DropdownMenuDirective, DropdownToggleDirective],
})
export class DropdownModule {}
