import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputModule, PipesModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../common/prism/prism.module';

import { PipesPageRoutingModule } from './pipes-page-routing.module';
import { PipesPageComponent } from './pipes-page.component';

@NgModule({
  declarations: [PipesPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, InputModule, PipesModule, PipesPageRoutingModule]
})
export class PipesPageModule {}
