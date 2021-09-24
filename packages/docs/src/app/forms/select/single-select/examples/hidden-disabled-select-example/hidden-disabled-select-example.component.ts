import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-hidden-disabled-select-example',
  templateUrl: './hidden-disabled-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiddenDisabledSelectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach', isDisabled: true, isHidden: true },
    { name: 'DDOS', value: 'ddos', isDisabled: false, isHidden: false },
    { name: 'Physical', value: 'physical', isDisabled: true, isHidden: false },
  ];

  selectControl = new FormControl([this.options[0].value]);
}
