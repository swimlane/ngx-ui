import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { AutosizeDirective } from './input-autosize.directive';

@Component({
  selector: `ngx-input-autosize-fixture`,
  template: ` <textarea [(ngModel)]="value" autosize></textarea> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutosizeDirectiveFixture {
  value = 'test';

  @ViewChild(AutosizeDirective, { static: false })
  readonly autosize: AutosizeDirective;
}
