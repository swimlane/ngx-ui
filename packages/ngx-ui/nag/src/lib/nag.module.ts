import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { ToolbarModule } from '@swimlane/ngx-ui/toolbar';
import { NagComponent } from './nag.component';

@NgModule({
  imports: [CommonModule, IconModule, ToolbarModule],
  declarations: [NagComponent],
  exports: [NagComponent],
})
export class NagModule {}
