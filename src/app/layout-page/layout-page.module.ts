import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToggleModule } from '@swimlane/ngx-ui';

import { LayoutPageRoutingModule } from './layout-page-routing.module';
import { LayoutPageComponent } from './layout-page.component';

@NgModule({
  declarations: [LayoutPageComponent],
  imports: [CommonModule, FormsModule, ToggleModule, LayoutPageRoutingModule]
})
export class LayoutPageModule {}
