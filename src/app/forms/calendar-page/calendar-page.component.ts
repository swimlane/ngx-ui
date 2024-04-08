import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPageComponent {
  curDate1 = new Date();
  curDate2 = new Date();
  curDate3 = new Date();
  curDate4 = new Date();
  curDate5 = new Date();
  curDate6 = new Date();

  minDate = new Date('10/2/2016');
  maxDate = new Date('10/22/2016');
  date = new Date('10/22/2016');

  dateTz: any = new Date('10/10/2016');

  invalidDate: any = 'foo';
  emptyDate: any = null;

  dateChanged(val) {
    console.log('date changed!', val);
  }

  onRangeSelect(val) {
    console.log(val);
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
