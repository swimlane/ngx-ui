import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'docs-basic-time-input',
  templateUrl: './basic-time-input.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicTimeInputComponent {
  dateControl = new FormControl(new Date(), [Validators.required]);
}
