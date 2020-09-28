import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxPageRoutingModule } from './checkbox-page-routing.module';
import { CheckboxModule, SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { CheckboxPageComponent } from './checkbox-page.component';

@NgModule({
  declarations: [CheckboxPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, CheckboxModule, CheckboxPageRoutingModule]
})
export class CheckboxPageModule {}
