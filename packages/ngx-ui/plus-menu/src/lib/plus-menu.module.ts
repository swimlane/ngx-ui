import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { TooltipModule } from '@swimlane/ngx-ui/tooltip';
import { PlusMenuComponent } from './plus-menu.component';

@NgModule({
  imports: [CommonModule, IconModule, TooltipModule],
  declarations: [PlusMenuComponent],
  exports: [PlusMenuComponent],
})
export class PlusMenuModule {}
