import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VisibilityModule } from '@swimlane/ngx-ui/directives/visibility';
import { CodeMirrorComponent } from './code-mirror.component';

@NgModule({
  imports: [CommonModule, FormsModule, VisibilityModule],
  declarations: [CodeMirrorComponent],
  exports: [CodeMirrorComponent],
})
export class CodeEditorModule {}
