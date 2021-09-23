import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-add-new-select-example',
  templateUrl: './add-new-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewSelectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach' },
    { name: 'DDOS', value: 'ddos' },
    { name: 'Physical', value: 'physical' }
  ];

  // TODO (caleb) does add new add to the option list?
  selectControl = new FormControl([this.options[0].value]);
}
