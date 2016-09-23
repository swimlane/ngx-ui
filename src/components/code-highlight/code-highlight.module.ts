import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CodeHighlightComponent } from './code-highlight.component';

@NgModule({
  declarations: [CodeHighlightComponent],
  exports: [CodeHighlightComponent],
  imports: [BrowserModule]
})
export class CodeHighlightModule { }
