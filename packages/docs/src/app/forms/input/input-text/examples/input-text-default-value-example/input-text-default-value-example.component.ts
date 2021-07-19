import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-input-text-default-value-example',
  templateUrl: './input-text-default-value-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextDefaultValueExampleComponent {
  inputDefaultVal = 'Defaulted!';
}
