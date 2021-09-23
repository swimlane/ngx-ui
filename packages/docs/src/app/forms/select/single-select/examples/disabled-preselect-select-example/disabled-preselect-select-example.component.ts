import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-disabled-preselect-select-example',
  templateUrl: './disabled-preselect-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabledPreselectSelectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach', isDisabled: false },
    { name: 'DDOS', value: 'ddos', isDisabled: true },
    { name: 'Physical', value: 'physical', isDisabled: true }
  ];

  selectControl = new FormControl([this.options[0].value]);
}
