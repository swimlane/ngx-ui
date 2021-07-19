import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DocExampleModule,
  DocMarkdownModule,
  DocPageModule,
  generateRoutes,
} from '@swimlane/ngx-doc';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { DecamelizeModule } from '@swimlane/ngx-ui/decamelize';
import { FilterByModule } from '@swimlane/ngx-ui/filter-by';
import { InputModule } from '@swimlane/ngx-ui/input';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { JsonTreeModule } from '@swimlane/ngx-ui/json-tree';
import { SizeModule } from '@swimlane/ngx-ui/size';
import { TimeZoneModule } from '@swimlane/ngx-ui/time-zone';
import { PipesComponent } from './pipes.component';

@NgModule({
  declarations: [PipesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(generateRoutes(PipesComponent)),
    DocPageModule,
    DocExampleModule,
    DocMarkdownModule,
    DecamelizeModule,
    TimeZoneModule,
    InputModule,
    InputAttributeModule,
    FormsModule,
    SizeModule,
    AppearanceModule,
    FilterByModule,
    JsonTreeModule,
  ],
})
export class PipesModule {}
