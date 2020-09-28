import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule, NavbarModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { NavbarPageRoutingModule } from './navbar-page-routing.module';
import { NavbarPageComponent } from './navbar-page.component';

@NgModule({
  declarations: [NavbarPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, NavbarModule, IconModule, NavbarPageRoutingModule]
})
export class NavbarPageModule {}
