import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadModule } from '@swimlane/ng2-file-upload';
import { FileButtonComponent } from './file-button.component';

@NgModule({
  imports: [CommonModule, FileUploadModule],
  declarations: [FileButtonComponent],
  exports: [FileButtonComponent]
})
export class FileButtonModule {}
