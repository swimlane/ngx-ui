import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component';
import { IconRegistryService } from '../../services/icon-registry/icon-registry.service';

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
  imports: [CommonModule],
  providers: [IconRegistryService]
})
export class IconModule {}
