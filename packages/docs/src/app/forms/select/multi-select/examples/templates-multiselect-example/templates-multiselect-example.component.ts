import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-templates-multiselect-example',
  templateUrl: './templates-multiselect-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesMultiselectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach', isDisabled: false },
    { name: 'DDOS', value: 'ddos', isDisabled: true },
    { name: 'Physical', value: 'physical', isDisabled: false },
  ];

  selectControl = new FormControl([this.options[0]]);

  onEvent($event: unknown) {
    console.log({ $event });
  }
}
