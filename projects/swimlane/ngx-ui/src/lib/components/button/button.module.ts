import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { FileUploadModule } from '@swimlane/ng2-file-upload';
import { FileButtonComponent } from './file-button.component';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [FileButtonComponent, ButtonComponent],
  exports: [FileButtonComponent, ButtonComponent],
  imports: [CommonModule]
})
export class ButtonModule {}
