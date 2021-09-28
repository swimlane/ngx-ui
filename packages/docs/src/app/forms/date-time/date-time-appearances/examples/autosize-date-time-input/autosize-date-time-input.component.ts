import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-autosize-date-time-input',
  templateUrl: './autosize-date-time-input.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutosizeDateTimeInputComponent {
  dateControl = new FormControl(new Date());

}
