import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-home',
  template: ` <ngx-doc-page></ngx-doc-page> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
