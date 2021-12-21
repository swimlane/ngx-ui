import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './date-display-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateDisplayPageComponent {
  date = new Date('1/1/2015');
}
