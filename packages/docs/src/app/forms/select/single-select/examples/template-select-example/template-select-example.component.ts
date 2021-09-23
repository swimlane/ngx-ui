import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-template-select-example',
  templateUrl: './template-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateSelectExampleComponent {
  selectControl = new FormControl([]);
}
