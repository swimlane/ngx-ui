import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { NavbarItemComponent } from './navbar-item.component';

const declarations = [NavbarComponent, NavbarItemComponent];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule]
})
export class NavbarModule {}
