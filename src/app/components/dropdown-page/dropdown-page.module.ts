import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionModule, DropdownModule } from '@swimlane/ngx-ui';

import { PrismModule } from '../../common/prism/prism.module';

import { DropdownPageRoutingModule } from './dropdown-page-routing.module';
import { DropdownPageComponent } from './dropdown-page.component';

@NgModule({
  declarations: [DropdownPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, DropdownModule, DropdownPageRoutingModule]
})
export class DropdownPageModule {}
