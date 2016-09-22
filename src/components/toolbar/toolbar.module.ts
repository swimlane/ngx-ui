import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';

@NgModule({
  declarations: [ToolbarComponent, ToolbarTitleDirective, ToolbarContentDirective],
  exports: [ToolbarComponent, ToolbarTitleDirective, ToolbarContentDirective],
  imports: [BrowserModule]
})
export class ToolbarModule { }
