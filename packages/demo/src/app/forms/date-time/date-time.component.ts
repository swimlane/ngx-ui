import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class DateTimeComponent {
  curDate = new Date();
  minDate = new Date('10/2/2016');
  maxDate = new Date('10/22/2016');
  curDate2 = new Date('10/10/2016');
  invalidDate = 'foo';
  emptyDate = null;

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
