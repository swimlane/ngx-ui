import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropzoneComponent } from './dropzone.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [DropzoneComponent],
  exports: [DropzoneComponent],
  imports: [CommonModule, ButtonModule, IconModule, TooltipModule]
})
export class DropzoneModule {}
