import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponent } from './icon.component';
import { IconRegistryService } from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [IconComponent],
  exports: [IconComponent],
  providers: [IconRegistryService],
})
export class IconModule {}
