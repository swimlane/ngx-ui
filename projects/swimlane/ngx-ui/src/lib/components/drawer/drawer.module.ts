import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '../overlay/overlay.module';
import { InjectionService } from '../../services/injection/injection.service';
import { DrawerComponent } from './drawer.component';
import { DrawerService } from './drawer.service';
import { DrawerContainerDirective } from './drawer-container.directive';

@NgModule({
  declarations: [DrawerComponent, DrawerContainerDirective],
  exports: [DrawerComponent, DrawerContainerDirective],
  providers: [DrawerService, InjectionService],
  imports: [CommonModule, OverlayModule],
  entryComponents: [DrawerComponent]
})
export class DrawerModule {}
