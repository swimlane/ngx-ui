import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionModule } from '@swimlane/ngx-ui/section';
import { MarkdownModule } from '../shared/ui/markdown/markdown.module';
import { SectionHeaderModule } from '../shared/ui/section-header/section-header.module';
import { AnimationsComponent } from './animations.component';

@NgModule({
  declarations: [AnimationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AnimationsComponent }]),
    SectionHeaderModule,
    SectionModule,
    MarkdownModule,
  ],
})
export class AnimationsModule {}
