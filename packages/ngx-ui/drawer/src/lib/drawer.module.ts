import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/injection';
import { OverlayModule } from '@swimlane/ngx-ui/overlay';
import { DrawerContainerDirective } from './directives';
import { DrawerComponent } from './drawer.component';
import { DrawerService } from './services';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [DrawerContainerDirective, DrawerComponent],
  providers: [DrawerService, InjectionService],
  exports: [DrawerContainerDirective, DrawerComponent],
})
export class DrawerModule {}
