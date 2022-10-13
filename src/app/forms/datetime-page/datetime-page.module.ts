import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DateTimeModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { DatetimePageRoutingModule } from './datetime-page-routing.module';
import { DatetimePageComponent } from './datetime-page.component';

@NgModule({
  declarations: [DatetimePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrismModule,
    SectionModule,
    DateTimeModule,
    DatetimePageRoutingModule,
    TabsModule
  ]
})
export class DatetimePageModule {}
