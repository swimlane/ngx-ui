import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../icon';
import { ToolbarModule } from '../toolbar';
import { NagComponent } from './nag.component';

@NgModule({
  declarations: [NagComponent],
  exports: [NagComponent],
  imports: [CommonModule, ToolbarModule, IconModule],
  entryComponents: [NagComponent]
})
export class NagModule { }
