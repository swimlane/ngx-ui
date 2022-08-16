/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

const TOHOKU_EARTHQUAKE = '2011-03-11T05:46:24Z';
const MOON_LANDING = '1969-07-20T20:17:43Z';

@Component({
  selector: 'app-datetime-page',
  templateUrl: './datetime-page.component.html',
  styleUrls: ['./datetime-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimePageComponent {
  date = new Date('10/10/2016');
  date2 = new Date('10/10/2016');
  date3 = new Date('10/10/2016');
  date4 = new Date('10/10/2016');
  minDate = new Date('10/2/2016');
  maxDate = new Date('10/22/2016');

  dateTime = new Date(MOON_LANDING);
  time = new Date(MOON_LANDING);

  eventDate = new Date(TOHOKU_EARTHQUAKE);

  precisionDate = new Date(MOON_LANDING);

  curDate: any = new Date(TOHOKU_EARTHQUAKE);
  curDate2: any = new Date('10/10/2016 2:35 PM');

  dateControl: FormControl;
  disabledDateControl: FormControl;
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.dateControl = fb.control(new Date('10/10/2016'));
    this.disabledDateControl = fb.control({ value: new Date('10/10/2016'), disabled: true });
    this.form = fb.group({
      date: this.dateControl,
      disabledDate: this.disabledDateControl
    });
  }

  dateChanged(val) {
    console.log('date changed!', val);
  }

  onBlurEvent(val) {
    console.log('blur event triggered', val);
  }

  dateTimeSelected(val) {
    console.log('date time selected', val);
  }

  onSubmit() {
    console.warn(this.form.value);
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
