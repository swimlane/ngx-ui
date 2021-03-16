import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from '../shared/ui/markdown/markdown.module';
import { SectionHeaderModule } from '../shared/ui/section-header/section-header.module';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LandingComponent }]),
    MarkdownModule,
    SectionHeaderModule,
  ],
})
export class LandingModule {}
