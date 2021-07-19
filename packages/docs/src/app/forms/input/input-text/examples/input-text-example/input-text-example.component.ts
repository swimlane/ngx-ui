import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'docs-input-text-example',
  templateUrl: './input-text-example.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextExampleComponent {
  inputValue = 'A Value';
  output: string | number = '';

  constructor() { }

}
