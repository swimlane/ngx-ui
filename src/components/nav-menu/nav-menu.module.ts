import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavMenuComponent } from './nav-menu.component';
import { IconModule, TooltipModule } from '..';

@NgModule({
  declarations: [NavMenuComponent],
  imports: [CommonModule, IconModule, TooltipModule],
  exports: [NavMenuComponent]
})
export class NavMenuModule {}
