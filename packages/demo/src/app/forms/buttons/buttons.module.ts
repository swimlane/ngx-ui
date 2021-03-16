import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from "@swimlane/ng2-file-upload";
import { ButtonModule } from '@swimlane/ngx-ui/button';
import { FileButtonModule } from '@swimlane/ngx-ui/file-button';
import { LongPressButtonModule } from '@swimlane/ngx-ui/long-press-button';
import { SectionModule } from '@swimlane/ngx-ui/section';
import { TabsModule } from '@swimlane/ngx-ui/tabs';
import { MarkdownModule } from '../../shared/ui/markdown/markdown.module';
import { SectionHeaderModule } from '../../shared/ui/section-header/section-header.module';
import { TabbedMarkdownModule } from "../../shared/ui/tabbed-markdown/tabbed-markdown.module";
import { ButtonsComponent } from './buttons.component';

@NgModule({
  declarations: [ButtonsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ButtonsComponent }]),
    SectionHeaderModule,
    SectionModule,
    MarkdownModule,
    ButtonModule,
    TabsModule,
    FileButtonModule,
    LongPressButtonModule,
    TabbedMarkdownModule,
    FileUploadModule,
  ],
})
export class ButtonsModule {}
