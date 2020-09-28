import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SplitPageRoutingModule } from './split-page-routing.module';
import { ButtonModule, SectionModule, SplitModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { SplitPageComponent } from './split-page.component';

@NgModule({
  declarations: [SplitPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, SplitModule, ButtonModule, SplitPageRoutingModule]
})
export class SplitPageModule {}
