import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'docs-template-select-example',
  templateUrl: './template-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateSelectExampleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
