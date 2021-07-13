import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconRegistryService } from './icon-registry.service';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IconComponent],
  exports: [IconComponent],
  providers: [IconRegistryService],
})
export class IconModule {}
