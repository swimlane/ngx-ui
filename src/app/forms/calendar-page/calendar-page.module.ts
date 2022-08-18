import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { CalendarModule, SectionModule, TabsModule, TimeZoneModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { CalendarPageRoutingModule } from './calendar-page-routing.module';
import { CalendarPageComponent } from './calendar-page.component';

@NgModule({
  declarations: [CalendarPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    CalendarModule,
    MomentModule,
    TimeZoneModule,
    CalendarPageRoutingModule,
    TabsModule
  ]
})
export class CalendarPageModule {}
