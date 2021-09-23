import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-disabled-placeholder-select-example',
  templateUrl: './disabled-placeholder-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabledPlaceholderSelectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach', isDisabled: true },
    { name: 'DDOS', value: 'ddos', isDisabled: false },
    { name: 'Physical', value: 'physical', isDisabled: true }
  ];

  selectControl = new FormControl([this.options[1].value]);
}
