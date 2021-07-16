import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { NotificationModule } from '@swimlane/ngx-ui/notification';
import { SectionModule } from '@swimlane/ngx-ui/section';
import { TabsModule } from '@swimlane/ngx-ui/tabs';
import { DocMarkdownModule } from '../doc-markdown/doc-markdown.module';
import { DocExampleComponent } from './doc-example.component';

@NgModule({
  imports: [
    CommonModule,
    SectionModule,
    IconModule,
    TabsModule,
    DocMarkdownModule,
    NotificationModule,
  ],
  declarations: [DocExampleComponent],
  exports: [DocExampleComponent],
})
export class DocExampleModule {}
