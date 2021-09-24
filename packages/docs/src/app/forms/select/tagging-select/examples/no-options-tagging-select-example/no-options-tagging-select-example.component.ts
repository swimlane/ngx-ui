import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-no-options-tagging-select-example',
  templateUrl: './no-options-tagging-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoOptionsTaggingSelectExampleComponent {
  selectControl = new FormControl([]);
}
