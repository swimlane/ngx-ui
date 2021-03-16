import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavbarComponent, NavbarItemComponent],
  exports: [NavbarComponent, NavbarItemComponent],
})
export class NavbarModule {}
