import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CodeEditorPageRoutingModule } from './code-editor-page-routing.module';
import { CodeEditorModule, SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { CodeEditorPageComponent } from './code-editor-page.component';

@NgModule({
  declarations: [CodeEditorPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, CodeEditorModule, CodeEditorPageRoutingModule]
})
export class CodeEditorPageModule {}
