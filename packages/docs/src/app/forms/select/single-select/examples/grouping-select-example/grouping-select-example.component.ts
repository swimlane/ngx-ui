import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-grouping-select-example',
  templateUrl: './grouping-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupingSelectExampleComponent {
  options = [
    { name: 'Breach', value: { value: 'breach', type: 'iOS' } },
    { name: 'DDOS', value: { value: 'ddos', type: 'Android' } },
    { name: 'Physical', value: { value: 'physical', type: 'iOS' } },
  ];

  selectControl = new FormControl([this.options[0].value]);
}
