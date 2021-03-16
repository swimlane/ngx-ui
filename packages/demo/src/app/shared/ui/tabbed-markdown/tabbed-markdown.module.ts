import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabsModule } from '@swimlane/ngx-ui/tabs';
import { MarkdownModule } from '../markdown/markdown.module';
import { TabbedMarkdownComponent } from './tabbed-markdown.component';

@NgModule({
  declarations: [TabbedMarkdownComponent],
  imports: [CommonModule, TabsModule, MarkdownModule],
  exports: [TabbedMarkdownComponent]
})
export class TabbedMarkdownModule {}
