import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  exportAs: 'ngxInputSuffix',
  selector: 'ngx-input-suffix',
  template: ' <ng-content></ng-content> ',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class InputSuffixComponent {}
