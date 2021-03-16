import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DateTimeModule as NgxDateTimeModule } from '@swimlane/ngx-ui/date-time';
import { SectionModule } from '@swimlane/ngx-ui/section';
import { TabsModule } from '@swimlane/ngx-ui/tabs';
import { MarkdownModule } from '../../shared/ui/markdown/markdown.module';
import { SectionHeaderModule } from '../../shared/ui/section-header/section-header.module';
import { DateTimeComponent } from './date-time.component';

@NgModule({
  declarations: [DateTimeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DateTimeComponent }]),
    SectionHeaderModule,
    SectionModule,
    NgxDateTimeModule,
    FormsModule,
    MarkdownModule,
    TabsModule
  ]
})
export class DateTimeModule {}
