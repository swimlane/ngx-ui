import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from '../dropdown';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';

@NgModule({
  declarations: [ToolbarComponent, ToolbarTitleDirective, ToolbarContentDirective],
  exports: [ToolbarComponent, ToolbarTitleDirective, ToolbarContentDirective],
  imports: [CommonModule, DropdownModule]
})
export class ToolbarModule { }
