import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileUploadModule } from 'ng2-file-upload';
import { FileButtonComponent } from './file-button.component';

@NgModule({
  declarations: [FileButtonComponent],
  exports: [FileButtonComponent],
  imports: [CommonModule, FileUploadModule]
})
export class ButtonModule { }
