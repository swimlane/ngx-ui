import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { InputComponent } from './input.component';
import { InputTypes } from './input-types.enum';

@Component({
  selector: `ngx-input-fixture`,
  template: `
    <ngx-input
      [(ngModel)]="value"
      [type]="type$ | async"
      [disabled]="disabled$ | async"
      [required]="required$ | async"
      [passwordTextVisible]="passwordTextVisible$ | async"
      [autofocus]="autofocus$ | async"
      [autoSelect]="autoSelect$ | async"
      [autocomplete]="autocomplete$ | async"
      [autocorrect]="autocorrect$ | async"
      [spellcheck]="spellcheck$ | async"
      [min]="min$ | async"
      [max]="max$ | async"
    ></ngx-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponentFixture {
  value = 'test';
  readonly type$ = new BehaviorSubject(InputTypes.text);
  readonly disabled$ = new BehaviorSubject(false);
  readonly passwordTextVisible$ = new BehaviorSubject(false);
  readonly required$ = new BehaviorSubject(false);
  readonly autofocus$ = new BehaviorSubject(false);
  readonly autoSelect$ = new BehaviorSubject(false);
  readonly autocomplete$ = new BehaviorSubject(true);
  readonly autocorrect$ = new BehaviorSubject(true);
  readonly spellcheck$ = new BehaviorSubject(true);
  readonly min$ = new BehaviorSubject<number>(undefined);
  readonly max$ = new BehaviorSubject<number>(undefined);

  @ViewChild(InputComponent, { static: false })
  readonly input: InputComponent;
}
