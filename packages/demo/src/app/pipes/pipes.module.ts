import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputModule } from '@swimlane/ngx-ui/input';
import { DecamelizeModule } from '@swimlane/ngx-ui/pipes/decamelize';
import { FilterModule } from '@swimlane/ngx-ui/pipes/filter';
import { JsonTreeModule } from '@swimlane/ngx-ui/pipes/json-tree';
import { TimeZoneModule } from '@swimlane/ngx-ui/pipes/time-zone';
import { SectionModule } from '@swimlane/ngx-ui/section';
import { MarkdownModule } from '../shared/ui/markdown/markdown.module';
import { SectionHeaderModule } from '../shared/ui/section-header/section-header.module';
import { PipesComponent } from './pipes.component';

@NgModule({
  declarations: [PipesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PipesComponent }]),
    SectionHeaderModule,
    SectionModule,
    DecamelizeModule,
    MarkdownModule,
    TimeZoneModule,
    FilterModule,
    InputModule,
    FormsModule,
    JsonTreeModule
  ]
})
export class PipesModule {}
