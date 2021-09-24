import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-preselected-hidden-select-example',
  templateUrl: './preselected-hidden-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreselectedHiddenSelectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach', isDisabled: false, isHidden: false },
    { name: 'DDOS', value: 'ddos', isDisabled: true, isHidden: true },
    { name: 'Physical', value: 'physical', isDisabled: true, isHidden: false },
  ];

  selectControl = new FormControl([this.options[1].value]);
}
