import { ChangeDetectionStrategy, ViewChild, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RadioButtonComponent } from './radiobutton.component';

@Component({
  selector: `ngx-radiobutton-fixture`,
  template: `
    <ngx-radiobutton
      tabindex="0"
      [(ngModel)]="model"
      [checked]="checked$ | async"
      [disabled]="disabled$ | async"
    ></ngx-radiobutton>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponentFixture {
  model = false;
  readonly checked$ = new BehaviorSubject(false);
  readonly disabled$ = new BehaviorSubject(false);

  @ViewChild(RadioButtonComponent, { static: false })
  readonly radioButton: RadioButtonComponent;
}
