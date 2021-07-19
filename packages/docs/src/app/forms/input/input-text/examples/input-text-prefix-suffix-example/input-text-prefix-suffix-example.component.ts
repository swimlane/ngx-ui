import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-input-text-prefix-suffix-example',
  templateUrl: './input-text-prefix-suffix-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextPrefixSuffixExampleComponent {
  inputValue1 = '';
}
