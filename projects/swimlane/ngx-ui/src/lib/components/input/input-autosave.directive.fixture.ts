import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AutosizeDirective } from './input-autosize.directive';
import { InputTypes } from './input-types.enum';

@Component({
  selector: 'ngx-input-autosize-fixture',
  template: `
    <input
      #input
      [style.max-width.px]="maxWidth$ | async"
      *ngIf="(type$ | async) === 'text'"
      [(ngModel)]="value"
      [autosize]="enabled$ | async"
    />
    <textarea
      #textarea
      *ngIf="(type$ | async) === 'textarea'"
      [(ngModel)]="value"
      [autosize]="enabled$ | async"
    ></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AutosizeDirectiveFixture {
  value = 'test';

  readonly type$ = new BehaviorSubject<InputTypes>(InputTypes.text);
  readonly enabled$ = new BehaviorSubject<boolean>(true);
  readonly maxWidth$ = new BehaviorSubject<number>(undefined);

  @ViewChild(AutosizeDirective)
  readonly autosize: AutosizeDirective;

  @ViewChild('input')
  readonly input?: ElementRef<HTMLInputElement>;

  @ViewChild('textarea')
  readonly textarea?: ElementRef<HTMLTextAreaElement>;
}
