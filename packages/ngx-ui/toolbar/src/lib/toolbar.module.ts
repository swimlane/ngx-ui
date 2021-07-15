import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownModule } from '@swimlane/ngx-ui/dropdown';
import { ToolbarContentDirective, ToolbarTitleDirective } from './directives';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [CommonModule, DropdownModule],
  declarations: [
    ToolbarContentDirective,
    ToolbarTitleDirective,
    ToolbarComponent,
  ],
  exports: [ToolbarContentDirective, ToolbarTitleDirective, ToolbarComponent],
})
export class ToolbarModule {}
