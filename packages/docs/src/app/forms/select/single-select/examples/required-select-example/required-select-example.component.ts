import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'docs-required-select-example',
  templateUrl: './required-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredSelectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach' },
    { name: 'DDOS', value: 'ddos' },
    { name: 'Physical', value: 'physical' },
  ];

  selectControl = new FormControl(
    [this.options[0].value],
    [Validators.required]
  );
}
