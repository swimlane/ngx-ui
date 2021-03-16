import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';
import { MarkdownComponent } from './markdown.component';

@NgModule({
  declarations: [MarkdownComponent],
  imports: [CommonModule, NgxMarkdownModule.forChild()],
  exports: [MarkdownComponent, NgxMarkdownModule],
})
export class MarkdownModule {}
