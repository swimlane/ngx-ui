import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { NavComponent } from './nav.component';

const declarations = [NavbarComponent, NavComponent];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule]
})
export class NavbarModule {}
