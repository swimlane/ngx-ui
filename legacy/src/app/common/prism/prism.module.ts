import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrismComponent } from './prism.component';

const declarations = [PrismComponent];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule]
})
export class PrismModule {}
