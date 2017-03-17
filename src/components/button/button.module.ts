import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'ng2-file-upload';
import { FileButtonComponent } from './file-button.component';

@NgModule({
  declarations: [FileButtonComponent],
  exports: [FileButtonComponent, FileUploadModule],
  imports: [CommonModule, FileUploadModule]
})
export class ButtonModule { }
