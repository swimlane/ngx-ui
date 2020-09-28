import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxIconPageRoutingModule } from './ngx-icon-page-routing.module';
import { IconModule, SectionModule, TabsModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { NgxIconPageComponent } from './ngx-icon-page.component';

@NgModule({
  declarations: [NgxIconPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, IconModule, TabsModule, NgxIconPageRoutingModule]
})
export class NgxIconPageModule {}
