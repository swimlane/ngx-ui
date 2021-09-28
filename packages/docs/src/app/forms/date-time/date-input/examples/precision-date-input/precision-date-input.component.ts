import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-precision-date-input',
  templateUrl: './precision-date-input.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrecisionDateInputComponent {
  dateControl = new FormControl(new Date());
}
