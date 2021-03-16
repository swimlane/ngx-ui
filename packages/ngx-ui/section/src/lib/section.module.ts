import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { SectionComponent } from './section.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [SectionHeaderComponent, SectionComponent],
  exports: [SectionHeaderComponent, SectionComponent],
})
export class SectionModule {}
