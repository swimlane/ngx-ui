import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatetimePageRoutingModule } from './datetime-page-routing.module';
import { DateTimeModule, SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { DatetimePageComponent } from './datetime-page.component';

@NgModule({
  declarations: [DatetimePageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, DateTimeModule, DatetimePageRoutingModule]
})
export class DatetimePageModule {}
