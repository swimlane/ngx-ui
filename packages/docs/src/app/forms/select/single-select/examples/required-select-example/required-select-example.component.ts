import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-required-select-example',
  templateUrl: './required-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredSelectExampleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
