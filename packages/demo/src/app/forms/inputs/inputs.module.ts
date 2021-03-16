import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputModule } from '@swimlane/ngx-ui/input';
import { SectionModule } from '@swimlane/ngx-ui/section';
import { TabsModule } from '@swimlane/ngx-ui/tabs';
import { MarkdownModule } from '../../shared/ui/markdown/markdown.module';
import { SectionHeaderModule } from '../../shared/ui/section-header/section-header.module';
import { TabbedMarkdownModule } from '../../shared/ui/tabbed-markdown/tabbed-markdown.module';
import { InputsComponent } from './inputs.component';

@NgModule({
  declarations: [InputsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: InputsComponent }]),
    SectionHeaderModule,
    SectionModule,
    InputModule,
    FormsModule,
    MarkdownModule,
    TabsModule,
    TabbedMarkdownModule
  ]
})
export class InputsModule {}
