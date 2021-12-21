import { ChangeDetectionStrategy, Component } from '@angular/core';
import moment from 'moment';

const MOON_LANDING = '1969-07-20T20:17:43Z';

@Component({
  templateUrl: './date-display-page.component.html',
  styleUrls: ['./date-display-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateDisplayPageComponent {
  date = new Date(MOON_LANDING);
  localString = moment(MOON_LANDING).tz(moment.tz.guess()).format('LLL');
}
