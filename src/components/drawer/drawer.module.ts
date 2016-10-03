import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InjectionService } from '../../utils';

import { DrawerComponent } from './drawer.component';
import { DrawerManagerService } from './drawer-manager.service';
import { DrawerOverlayComponent } from './drawer-overlay.component';
import { DrawerContainerComponent } from './drawer-container.component';

@NgModule({
  declarations: [DrawerComponent, DrawerOverlayComponent, DrawerContainerComponent],
  providers: [DrawerManagerService, InjectionService],
  exports: [DrawerContainerComponent],
  imports: [CommonModule],
  entryComponents: [DrawerContainerComponent]
})
export class DrawerModule { }
