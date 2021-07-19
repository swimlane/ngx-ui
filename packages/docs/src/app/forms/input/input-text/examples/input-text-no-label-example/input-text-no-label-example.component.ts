import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-input-text-no-label-example',
  templateUrl: './input-text-no-label-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextNoLabelExampleComponent {
  inputValue1 = '';
}
