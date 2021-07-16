import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { DocMarkdownComponent } from './doc-markdown.component';

@NgModule({
  declarations: [DocMarkdownComponent],
  imports: [CommonModule, MarkdownModule],
  exports: [DocMarkdownComponent],
})
export class DocMarkdownModule {}
