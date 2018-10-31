import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
  imports: [CommonModule]
})
export class IconModule {}
