import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'docs-async-select-example',
  templateUrl: './async-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncSelectExampleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
