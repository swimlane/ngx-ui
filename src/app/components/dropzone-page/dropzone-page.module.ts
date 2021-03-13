import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionModule, DropzoneModule, DialogModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { DropzonePageRoutingModule } from './dropzone-page-routing.module';
import { DropzonePageComponent } from './dropzone-page.component';

@NgModule({
  declarations: [DropzonePageComponent],
  imports: [CommonModule, PrismModule, SectionModule, DropzoneModule, DropzonePageRoutingModule, DialogModule]
})
export class DropzonePageModule {}
