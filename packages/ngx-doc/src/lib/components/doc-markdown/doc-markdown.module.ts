import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CopyToClipboardModule } from '@swimlane/ngx-ui/copy-to-clipboard';
import { MarkdownModule } from 'ngx-markdown';
import { DocMarkdownComponent } from './doc-markdown.component';

@NgModule({
  declarations: [DocMarkdownComponent],
  imports: [CommonModule, MarkdownModule, CopyToClipboardModule],
  exports: [DocMarkdownComponent],
})
export class DocMarkdownModule {}
