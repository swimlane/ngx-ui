import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JsonEditorPageRoutingModule } from './json-editor-page-routing.module';
import {
  ButtonModule,
  JsonEditorModule,
  SectionModule,
  TabsModule
} from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
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
    ButtonModule,
    JsonEditorPageRoutingModule
  ]
})
export class JsonEditorPageModule {}
