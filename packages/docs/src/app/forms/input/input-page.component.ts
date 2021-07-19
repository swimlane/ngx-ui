import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-input-page',
  template: `
    <ngx-doc-page header="Inputs">
      <ng-template ngxDocPageTab>
        <docs-input-text></docs-input-text>
      </ng-template>
      <ng-template ngxDocPageTab> API</ng-template>
    </ngx-doc-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPageComponent {}
