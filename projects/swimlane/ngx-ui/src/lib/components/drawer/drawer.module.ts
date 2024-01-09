import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '../../services/injection/injection.service';

import { OverlayModule } from '../overlay/overlay.module';
import { DialogDrawerContentComponent } from './dialog-drawer-content/dialog-drawer-content.component';
import { DrawerContainerDirective } from './drawer-container.directive';
import { DrawerComponent } from './drawer.component';

@NgModule({
  declarations: [DrawerComponent, DrawerContainerDirective, DialogDrawerContentComponent],
  exports: [DrawerComponent, DrawerContainerDirective, DialogDrawerContentComponent],
  providers: [InjectionService],
  imports: [CommonModule, OverlayModule]
})
export class DrawerModule {}
