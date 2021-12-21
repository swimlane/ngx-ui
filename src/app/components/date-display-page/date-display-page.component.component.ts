import { ChangeDetectionStrategy, Component } from '@angular/core';
import moment from 'moment-timezone';

// const MOON_LANDING = '1969-07-20T20:17:43Z';
const TOHOKU_EARTHQUAKE = '2011-03-11T05:46:24Z';

@Component({
  templateUrl: './date-display-page.component.html',
  styleUrls: ['./date-display-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateDisplayPageComponent {
  date = TOHOKU_EARTHQUAKE;
  localString = moment(TOHOKU_EARTHQUAKE).tz(moment.tz.guess()).format('LLL');
}
