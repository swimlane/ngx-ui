import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SectionModule, TabsModule, ToggleModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { TogglePageRoutingModule } from './toggle-page-routing.module';
import { TogglePageComponent } from './toggle-page.component';

@NgModule({
  declarations: [TogglePageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, ToggleModule, TogglePageRoutingModule, TabsModule]
})
export class TogglePageModule {}
