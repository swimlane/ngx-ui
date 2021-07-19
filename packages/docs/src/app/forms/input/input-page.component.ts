import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'docs-input-page',
  template: `
   <ngx-doc-page header='Inputs'>
      <docs-input-text></docs-input-text>
   </ngx-doc-page>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
