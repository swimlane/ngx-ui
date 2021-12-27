/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component } from '@angular/core';

const TOHOKU_EARTHQUAKE = '2011-03-11T05:46:24Z';

@Component({
  selector: 'app-datetime-page',
  templateUrl: './datetime-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimePageComponent {
  curDate: any = new Date(TOHOKU_EARTHQUAKE);
  minDate: any = new Date('10/2/2016');
  maxDate: any = new Date('10/22/2016');
  curDate2: any = new Date('10/10/2016');
  invalidDate: any = 'foo';
  emptyDate: any = null;

  dateChanged(val) {
    console.log('date changed!', val);
  }

  onBlurEvent(val) {
    console.log('blur event triggered', val);
  }

  dateTimeSelected(val) {
    console.log('date time selected', val);
  }
}
