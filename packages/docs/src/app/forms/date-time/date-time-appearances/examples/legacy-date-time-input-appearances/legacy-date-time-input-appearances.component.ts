import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-legacy-date-time-input-appearances',
  templateUrl: './legacy-date-time-input-appearances.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegacyDateTimeInputAppearancesComponent {
  dateControl = new FormControl(new Date());

}
