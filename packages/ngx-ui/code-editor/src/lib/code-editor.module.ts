import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IntersectionObserverModule } from '@swimlane/ngx-ui/intersection-observer';
import { CodeEditorComponent } from './code-editor.component';

@NgModule({
  imports: [CommonModule, IntersectionObserverModule],
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent],
})
export class CodeEditorModule {}
