import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesPageRoutingModule } from './pipes-page-routing.module';
import { InputModule, SectionModule } from '../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../common/prism/prism.module';
import { PipesPageComponent } from './pipes-page.component';

@NgModule({
  declarations: [PipesPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, InputModule, PipesPageRoutingModule]
})
export class PipesPageModule {}
