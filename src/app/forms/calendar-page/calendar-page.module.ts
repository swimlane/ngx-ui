import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule, SectionModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';

import { CalendarPageRoutingModule } from './calendar-page-routing.module';
import { CalendarPageComponent } from './calendar-page.component';

@NgModule({
  declarations: [CalendarPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, CalendarModule, CalendarPageRoutingModule]
})
export class CalendarPageModule {}
