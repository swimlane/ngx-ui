import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-customization-select-example',
  templateUrl: './customization-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationSelectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach' },
    { name: 'DDOS', value: 'ddos' },
    { name: 'Physical', value: 'physical' },
  ];

  selectControl = new FormControl([this.options[0].value]);
}
