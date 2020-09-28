import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TogglePageRoutingModule } from './toggle-page-routing.module';
import { SectionModule, ToggleModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { TogglePageComponent } from './toggle-page.component';

@NgModule({
  declarations: [TogglePageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, ToggleModule, TogglePageRoutingModule]
})
export class TogglePageModule {}
