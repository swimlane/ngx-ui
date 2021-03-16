import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { SectionModule } from '@swimlane/ngx-ui/section';
import { SelectModule } from '@swimlane/ngx-ui/select';
import { MarkdownModule } from '../../shared/ui/markdown/markdown.module';
import { SectionHeaderModule } from '../../shared/ui/section-header/section-header.module';
import { TabbedMarkdownModule } from '../../shared/ui/tabbed-markdown/tabbed-markdown.module';
import { SelectsComponent } from './selects.component';

@NgModule({
  declarations: [SelectsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SelectsComponent }]),
    SectionHeaderModule,
    SectionModule,
    SelectModule,
    MarkdownModule,
    FormsModule,
    TabbedMarkdownModule,
    IconModule
  ],
  exports: [SelectsComponent]
})
export class SelectsModule {}
