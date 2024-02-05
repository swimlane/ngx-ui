import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../icon/icon.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { NagComponent } from './nag.component';

@NgModule({
  declarations: [NagComponent],
  exports: [NagComponent],
  imports: [CommonModule, ToolbarModule, IconModule]
})
export class NagModule {}
