import { ChangeDetectionStrategy, ViewChild, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RadioButtonGroupComponent } from './radiobutton-group.component';

@Component({
  selector: 'ngx-radiobutton-group-fixture',
  template: `
    <ngx-radiobutton-group tabindex="0" [name]="name$ | async" [(ngModel)]="value" [disabled]="disabled$ | async">
      <ngx-radiobutton *ngFor="let option of options" [value]="option">
        {{ option }}
      </ngx-radiobutton>
    </ngx-radiobutton-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class RadioButtonGroupComponentFixture {
  value = 'one';
  readonly name$ = new BehaviorSubject('test');
  readonly disabled$ = new BehaviorSubject(false);
  readonly options = ['one', 'two', 'three'];

  @ViewChild(RadioButtonGroupComponent, { static: false })
  readonly radioButtonGroup: RadioButtonGroupComponent;
}
