import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-fill-date-time-input-appearances',
  templateUrl: './fill-date-time-input-appearances.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillDateTimeInputAppearancesComponent {
  dateControl = new FormControl(new Date());
}
