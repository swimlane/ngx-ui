import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { DropdownComponent } from './dropdown.component';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownPortalDirective } from './dropdown-portal.directive';
import { InViewportModule } from 'ng-in-viewport';

@NgModule({
  declarations: [DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownPortalDirective],
  exports: [DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownPortalDirective],
  imports: [CommonModule, OverlayModule, InViewportModule]
})
export class DropdownModule {}
