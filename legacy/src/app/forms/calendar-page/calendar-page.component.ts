import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPageComponent {
  curDate: any = new Date();
  minDate: any = new Date('10/2/2016');
  maxDate: any = new Date('10/22/2016');
  curDate2: any = new Date('10/10/2016');
  curDate3: any = new Date('10/10/2016');
  invalidDate: any = 'foo';
  emptyDate: any = null;

  dateChanged(val) {
    console.log('date changed!', val);
  }
}
