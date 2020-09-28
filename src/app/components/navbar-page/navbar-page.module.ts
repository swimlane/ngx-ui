import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarPageRoutingModule } from './navbar-page-routing.module';
import { IconModule, NavbarModule, SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { NavbarPageComponent } from './navbar-page.component';

@NgModule({
  declarations: [NavbarPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, NavbarModule, IconModule, NavbarPageRoutingModule]
})
export class NavbarPageModule {}
