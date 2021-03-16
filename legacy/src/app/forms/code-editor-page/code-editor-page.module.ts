import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CodeEditorModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { CodeEditorPageRoutingModule } from './code-editor-page-routing.module';
import { CodeEditorPageComponent } from './code-editor-page.component';

@NgModule({
  declarations: [CodeEditorPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, CodeEditorModule, CodeEditorPageRoutingModule]
})
export class CodeEditorPageModule {}
