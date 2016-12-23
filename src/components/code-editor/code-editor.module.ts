import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CodeEditorComponent } from './code-editor.component';

@NgModule({
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent],
  imports: [CommonModule, FormsModule]
})
export class CodeEditorModule { }
