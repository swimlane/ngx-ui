import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropzoneComponent } from './dropzone.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [DropzoneComponent],
  exports: [DropzoneComponent],
  imports: [CommonModule, ButtonModule, IconModule]
})
export class DropzoneModule {}
