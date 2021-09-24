import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-filter-select-example',
  templateUrl: './filter-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSelectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach' },
    { name: 'DDOS', value: 'ddos' },
    { name: 'DDOS and Breach', value: 'ddos_and_breach' },
    { name: 'Physical', value: 'physical' },
  ];

  selectControl = new FormControl([this.options[0].value]);
  // TODO (caleb) looks like select filter isn't case sensitive
  caseSensitiveControl = new FormControl([this.options[0].value]);
}
