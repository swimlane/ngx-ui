import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  exportAs: 'ngxInputSuffix',
  selector: 'ngx-input-suffix',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSuffixComponent {}
