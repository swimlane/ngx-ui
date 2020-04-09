import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavMenuComponent } from './nav-menu.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [NavMenuComponent],
  imports: [CommonModule, IconModule, TooltipModule],
  exports: [NavMenuComponent],
})
export class NavMenuModule {}
