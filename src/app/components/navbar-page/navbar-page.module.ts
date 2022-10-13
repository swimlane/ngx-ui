import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule, NavbarModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { NavbarPageRoutingModule } from './navbar-page-routing.module';
import { NavbarPageComponent } from './navbar-page.component';
import { NavbarChildComponent1 } from './child-component-1.component';
import { NavbarChildComponent2 } from './child-component-2.component';

@NgModule({
  declarations: [NavbarPageComponent, NavbarChildComponent1, NavbarChildComponent2],
  imports: [CommonModule, PrismModule, SectionModule, NavbarModule, IconModule, NavbarPageRoutingModule, TabsModule]
})
export class NavbarPageModule {}
