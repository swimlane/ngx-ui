import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrismModule } from '../common/prism/prism.module';

import { ColorsPageRoutingModule } from './colors-page-routing.module';
import { ColorsPageComponent } from './colors-page.component';

@NgModule({
  declarations: [ColorsPageComponent],
  imports: [CommonModule, PrismModule, ColorsPageRoutingModule]
})
export class ColorsPageModule {}
