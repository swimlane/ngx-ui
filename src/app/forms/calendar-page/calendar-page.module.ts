import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarPageRoutingModule } from './calendar-page-routing.module';
import { CalendarModule, SectionModule } from '../../../../projects/swimlane/ngx-ui/src/public_api';
import { PrismModule } from '../../common/prism/prism.module';
import { CalendarPageComponent } from './calendar-page.component';

@NgModule({
  declarations: [CalendarPageComponent],
  imports: [CommonModule, FormsModule, PrismModule, SectionModule, CalendarModule, CalendarPageRoutingModule]
})
export class CalendarPageModule {}
