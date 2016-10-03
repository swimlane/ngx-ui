import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '../overlay';
import { InjectionService } from '../../utils';

import { DrawerComponent } from './drawer.component';
import { DrawerService } from './drawer.service';
import { DrawerContainerComponent } from './drawer-container.component';

@NgModule({
  declarations: [DrawerComponent, DrawerContainerComponent],
  providers: [DrawerService, InjectionService],
  exports: [DrawerContainerComponent],
  imports: [CommonModule, OverlayModule],
  entryComponents: [DrawerContainerComponent]
})
export class DrawerModule { }
