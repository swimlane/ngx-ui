import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../icon/icon.module';
import { SectionComponent } from './section.component';
import { SectionHeaderComponent } from './section-header.component';

@NgModule({
  declarations: [SectionComponent, SectionHeaderComponent],
  exports: [SectionComponent, SectionHeaderComponent],
  imports: [CommonModule, IconModule]
})
export class SectionModule {}
