import { ChangeDetectionStrategy, ViewChild, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RadioButtonGroupComponent } from './radiobutton-group.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-radiobutton-group-fixture',
  template: `
    <ngx-radiobutton-group tabindex="0" [name]="name$ | async" [(ngModel)]="value" [disabled]="disabled$ | async">
      @for (option of options; track option) {
        <ngx-radiobutton [value]="option">
          {{ option }}
        </ngx-radiobutton>
      }
    </ngx-radiobutton-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RadioButtonGroupComponentFixture {
  value = 'one';
  readonly name$ = new BehaviorSubject('test');
  readonly disabled$ = new BehaviorSubject(false);
  readonly options = ['one', 'two', 'three'];

  @ViewChild(RadioButtonGroupComponent, { static: false })
  readonly radioButtonGroup: RadioButtonGroupComponent;
}
