import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawerModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { DrawerPageRoutingModule } from './drawer-page-routing.module';
import { DrawerPageComponent } from './drawer-page.component';
import { DrawerContainerExampleComponent } from './drawer-container-example/drawer-container-example.component';

@NgModule({
  declarations: [DrawerPageComponent, DrawerContainerExampleComponent],
  imports: [CommonModule, PrismModule, SectionModule, DrawerModule, TabsModule, DrawerPageRoutingModule]
})
export class DrawerPageModule {}
