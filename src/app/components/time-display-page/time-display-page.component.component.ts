import { ChangeDetectionStrategy, Component } from '@angular/core';
import moment from 'moment-timezone';

const TOHOKU_EARTHQUAKE = '2011-03-11T05:46:24Z';

@Component({
  templateUrl: './time-display-page.component.html',
  styleUrls: ['./time-display-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeDisplayPageComponent {
  date = TOHOKU_EARTHQUAKE;
  localString = moment(TOHOKU_EARTHQUAKE).tz(moment.tz.guess()).format('MMMM D, YYYY h:mm:ss A');

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
