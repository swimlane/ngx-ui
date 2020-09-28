import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DateTimeModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { DatetimePageRoutingModule } from './datetime-page-routing.module';
import { DatetimePageComponent } from './datetime-page.component';

@NgModule({
  declarations: [DatetimePageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, DateTimeModule, DatetimePageRoutingModule]
})
export class DatetimePageModule {}
