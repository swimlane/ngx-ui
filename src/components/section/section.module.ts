import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionComponent } from './section.component';
import { SectionHeaderComponent } from './section-header.component';

@NgModule({
  declarations: [SectionComponent, SectionHeaderComponent],
  exports: [SectionComponent, SectionHeaderComponent],
  imports: [CommonModule]
})
export class SectionModule { }
