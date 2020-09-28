import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutPageRoutingModule } from './layout-page-routing.module';
import { ToggleModule } from '../../../projects/swimlane/ngx-ui/src/public_api';
import { LayoutPageComponent } from './layout-page.component';

@NgModule({
  declarations: [LayoutPageComponent],
  imports: [CommonModule, FormsModule, ToggleModule, LayoutPageRoutingModule]
})
export class LayoutPageModule {}
