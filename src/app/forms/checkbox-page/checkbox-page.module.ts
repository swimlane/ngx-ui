import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { CheckboxPageRoutingModule } from './checkbox-page-routing.module';
import { CheckboxPageComponent } from './checkbox-page.component';

@NgModule({
  declarations: [CheckboxPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, CheckboxModule, CheckboxPageRoutingModule]
})
export class CheckboxPageModule {}
