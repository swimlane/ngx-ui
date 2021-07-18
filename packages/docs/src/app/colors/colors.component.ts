import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-colors',
  template: `
    <ngx-doc-page header="Colors">
      <docs-colors-hue></docs-colors-hue>
      <docs-colors-grey></docs-colors-grey>
      <docs-colors-gradients></docs-colors-gradients>
      <docs-colors-charts></docs-colors-charts>
      <docs-colors-miscs></docs-colors-miscs>
    </ngx-doc-page>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
