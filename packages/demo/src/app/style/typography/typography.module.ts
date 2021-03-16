import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionModule } from '@swimlane/ngx-ui/section';
import { MarkdownModule } from '../../shared/ui/markdown/markdown.module';
import { SectionHeaderModule } from '../../shared/ui/section-header/section-header.module';
import { TypographyComponent } from './typography.component';

@NgModule({
  declarations: [TypographyComponent],
  imports: [
    CommonModule,
    SectionModule,
    RouterModule.forChild([{ path: '', component: TypographyComponent }]),
    MarkdownModule,
    SectionHeaderModule
  ],
  exports: [TypographyComponent]
})
export class TypographyModule {}
