import { ChangeDetectionStrategy, ViewChild, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RadioButtonComponent } from './radiobutton.component';
import { RadioButtonModule } from './radiobutton.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-radiobutton-fixture',
  template: `
    <ngx-radiobutton
      #one
      tabindex="0"
      [value]="value"
      [checked]="checked$ | async"
      [disabled]="disabled$ | async"
      (change)="checked$.next($event); value = $event"
    ></ngx-radiobutton>

    <ngx-radiobutton
      #two
      tabindex="1"
      [(ngModel)]="value"
      [checked]="checked$ | async"
      [disabled]="disabled$ | async"
    ></ngx-radiobutton>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RadioButtonModule, CommonModule, FormsModule]
})
export class RadioButtonComponentFixture {
  value = false;
  readonly checked$ = new BehaviorSubject(false);
  readonly disabled$ = new BehaviorSubject(false);

  @ViewChild('one', { static: false })
  readonly one: RadioButtonComponent;

  @ViewChild('two', { static: false })
  readonly two: RadioButtonComponent;
}
