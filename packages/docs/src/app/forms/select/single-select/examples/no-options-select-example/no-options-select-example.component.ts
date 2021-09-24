import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-no-options-select-example',
  templateUrl: './no-options-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoOptionsSelectExampleComponent {
  options = [];

  selectControl = new FormControl([]);
}
