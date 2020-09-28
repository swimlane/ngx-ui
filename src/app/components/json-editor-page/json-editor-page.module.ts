import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ButtonModule,
  CodeEditorModule,
  DialogModule,
  JsonEditorModule,
  SectionModule,
  TabsModule,
  ToggleModule
} from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { JsonEditorPageRoutingModule } from './json-editor-page-routing.module';
import { JsonEditorPageComponent } from './json-editor-page.component';

@NgModule({
  declarations: [JsonEditorPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    JsonEditorModule,
    TabsModule,
    DialogModule,
    ToggleModule,
    CodeEditorModule,
    ButtonModule,
    JsonEditorPageRoutingModule
  ]
})
export class JsonEditorPageModule {}
