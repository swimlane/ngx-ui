import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-basic-date-time',
  templateUrl: './basic-date-time.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicDateTimeComponent {
  dateControl = new FormControl(new Date());
}
