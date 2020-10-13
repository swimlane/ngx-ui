import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IconModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { NgxIconPageRoutingModule } from './ngx-icon-page-routing.module';
import { NgxIconPageComponent } from './ngx-icon-page.component';

@NgModule({
  declarations: [NgxIconPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, IconModule, TabsModule, NgxIconPageRoutingModule]
})
export class NgxIconPageModule {}
