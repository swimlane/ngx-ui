import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-basic-tagging-select-example',
  templateUrl: './basic-tagging-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTaggingSelectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach' },
    { name: 'DDOS', value: 'ddos' },
    { name: 'Physical', value: 'physical' },
  ];

  selectControl = new FormControl([this.options[0].value]);
}
