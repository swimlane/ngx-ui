import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-long-values-select-example',
  templateUrl: './long-values-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongValuesSelectExampleComponent {
  options = [
    {
      name: 'supercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocious',
      value:
        'supercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocious',
    },
    {
      name: 'supe rcalifragilist icexpialidocious',
      value: 's2344',
    },
    {
      name: 'super califragilisticex pialidoc ious',
      value: 's3121',
    },
  ];

  selectControl = new FormControl([this.options[0].value]);
}
