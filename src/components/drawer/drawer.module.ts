import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToolbarModule } from '../toolbar';
import { InjectionService } from '../../utils/index';

import { DrawerComponent } from './drawer.component';
import { DrawerManagerService } from './drawer-manager.service';
import { DrawerOverlayComponent } from './drawer-overlay.component';
import { DrawerContainerComponent } from './drawer-container.component';

@NgModule({
  declarations: [DrawerComponent, DrawerOverlayComponent, DrawerContainerComponent],
  providers: [DrawerManagerService, InjectionService],
  exports: [DrawerContainerComponent],
  imports: [BrowserModule, ToolbarModule],
  entryComponents: [DrawerContainerComponent]
})
export class DrawerModule { }
