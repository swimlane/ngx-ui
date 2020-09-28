import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawerPageRoutingModule } from './drawer-page-routing.module';
import { DrawerModule, SectionModule, TabsModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { DrawerPageComponent } from './drawer-page.component';
import { DrawerContainerExampleComponent } from './drawer-container-example/drawer-container-example.component';

@NgModule({
  declarations: [DrawerPageComponent, DrawerContainerExampleComponent],
  imports: [CommonModule, PrismModule, SectionModule, DrawerModule, TabsModule, DrawerPageRoutingModule]
})
export class DrawerPageModule {}
