import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadModule } from '@swimlane/ng2-file-upload';
import { FileButtonModule } from '@swimlane/ngx-ui/file-button';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { DropzoneComponent } from './dropzone.component';

@NgModule({
  imports: [CommonModule, FileButtonModule, FileUploadModule, IconModule],
  declarations: [DropzoneComponent],
  exports: [DropzoneComponent],
})
export class DropzoneModule {}
