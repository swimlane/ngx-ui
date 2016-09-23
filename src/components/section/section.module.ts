import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SectionComponent } from './section.component';
import { SectionHeaderComponent } from './section-header.component';

@NgModule({
  declarations: [SectionComponent, SectionHeaderComponent],
  exports: [SectionComponent, SectionHeaderComponent],
  imports: [BrowserModule]
})
export class SectionModule { }
