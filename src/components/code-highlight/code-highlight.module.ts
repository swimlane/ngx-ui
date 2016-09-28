import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeHighlightComponent } from './code-highlight.component';

@NgModule({
  declarations: [CodeHighlightComponent],
  exports: [CodeHighlightComponent],
  imports: [CommonModule]
})
export class CodeHighlightModule { }
