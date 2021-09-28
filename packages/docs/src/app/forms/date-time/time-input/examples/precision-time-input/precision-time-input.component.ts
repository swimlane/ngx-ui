import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-precision-time-input',
  templateUrl: './precision-time-input.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrecisionTimeInputComponent {
  dateControl = new FormControl(new Date());

}
