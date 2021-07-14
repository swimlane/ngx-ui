import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/common';
import { DialogDrawerContentComponent } from './dialog-drawer-content/dialog-drawer-content.component';
import { DrawerContainerDirective } from './directives';
import { DrawerComponent } from './drawer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DrawerComponent,
    DrawerContainerDirective,
    DialogDrawerContentComponent,
  ],
  exports: [
    DrawerComponent,
    DrawerContainerDirective,
    DialogDrawerContentComponent,
  ],
  providers: [InjectionService],
})
export class DrawerModule {}
