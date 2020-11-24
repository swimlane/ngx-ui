import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';
import { PlusMenuPageRoutingModule } from './plus-menu-page-routing.module';
import { PlusMenuPageComponent } from './plus-menu-page.component';
import { PlusMenuModule } from '@swimlane/ngx-ui/components/plus-menu/plus-menu.module';

@NgModule({
  declarations: [PlusMenuPageComponent],
  imports: [CommonModule, PrismModule, SectionModule, PlusMenuModule, PlusMenuPageRoutingModule]
})
export class PlusMenuPageModule {}
