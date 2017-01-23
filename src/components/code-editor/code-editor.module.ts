import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DirectivesModule } from '../../directives';
import { CodeEditorComponent } from './code-editor.component';

@NgModule({
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent],
  imports: [CommonModule, FormsModule, DirectivesModule]
})
export class CodeEditorModule { }
