import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '../overlay';
import { InjectionService } from '../../utils';

import { DrawerComponent } from './drawer.component';
import { DrawerManagerService } from './drawer-manager.service';
import { DrawerContainerComponent } from './drawer-container.component';

@NgModule({
  declarations: [DrawerComponent, DrawerContainerComponent],
  providers: [DrawerManagerService, InjectionService],
  exports: [DrawerContainerComponent],
  imports: [CommonModule, OverlayModule],
  entryComponents: [DrawerContainerComponent]
})
export class DrawerModule { }
