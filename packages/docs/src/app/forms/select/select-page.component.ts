import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { introMd } from './docs';

@Component({
  selector: 'docs-select-page',
  template: `
    <ngx-doc-page header="Select">
      <ngx-doc-markdown [code]="introMd"></ngx-doc-markdown>

      <ng-template ngxDocPageTab="Single Select">
        <docs-single-select></docs-single-select>
      </ng-template>
      <ng-template ngxDocPageTab="Multi Select">
        <docs-multi-select></docs-multi-select>
      </ng-template>

      <ng-template ngxDocPageTab="Tagging">
        <docs-tagging-select></docs-tagging-select>
      </ng-template>

      <ng-template ngxDocPageTab="Native">
        <docs-native-select></docs-native-select>
      </ng-template>

      <ng-template ngxDocPageTab="Async">
        <docs-async-select></docs-async-select>
      </ng-template>

      <ng-template ngxDocPageTab="Appearances">
        <docs-appearance-select></docs-appearance-select>
      </ng-template>
    </ngx-doc-page>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent implements OnInit {
  readonly introMd = introMd;

  constructor() {}

  ngOnInit(): void {}
}
