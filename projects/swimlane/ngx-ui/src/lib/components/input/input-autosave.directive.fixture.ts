import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AutosizeDirective } from './input-autosize.directive';
import { InputTypes } from './input-types.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-input-autosize-fixture',
  template: `
    @if ((type$ | async) === 'text') {
      <input #input [style.max-width.px]="maxWidth$ | async" [(ngModel)]="value" [autosize]="enabled$ | async" />
    }
    @if ((type$ | async) === 'textarea') {
      <textarea #textarea [(ngModel)]="value" [autosize]="enabled$ | async"></textarea>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule]
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
