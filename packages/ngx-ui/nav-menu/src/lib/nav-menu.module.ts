import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavMenuComponent } from './nav-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavMenuComponent],
  exports: [NavMenuComponent],
})
export class NavMenuModule {}
