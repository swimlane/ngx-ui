import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlusMenuModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';
import { PlusMenuPageRoutingModule } from './plus-menu-page-routing.module';
import { PlusMenuPageComponent } from './plus-menu-page.component';

@NgModule({
  declarations: [PlusMenuPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, PlusMenuModule, PlusMenuPageRoutingModule]
})
export class PlusMenuPageModule {}
