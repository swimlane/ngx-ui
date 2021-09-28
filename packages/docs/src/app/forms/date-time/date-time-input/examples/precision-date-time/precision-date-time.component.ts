import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-precision-date-time',
  templateUrl: './precision-date-time.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrecisionDateTimeComponent {
  dateControl = new FormControl(new Date());
}
