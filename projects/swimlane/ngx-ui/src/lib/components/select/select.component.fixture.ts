import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SelectComponent } from './select.component';
import { SelectDropdownOption } from './select-dropdown-option.interface';
import { selectDropdownOptionMock } from './select-dropdown-option.mock';

@Component({
  selector: 'ngx-select-fixture',
  template: `
    <ngx-select
      placeholder="placeholder"
      [identifier]="identifier$ | async"
      [(ngModel)]="selected"
      [minSelections]="minSelections$ | async"
      [maxSelections]="maxSelections$ | async"
      [autofocus]="autofocus$ | async"
      [autosize]="autosize$ | async"
      [allowClear]="allowClear$ | async"
      [allowAdditions]="allowAdditions$ | async"
      [disableDropdown]="disableDropdown$ | async"
      [closeOnSelect]="closeOnSelect$ | async"
      [closeOnBodyClick]="closeOnBodyClick$ | async"
      [filterable]="filterable$ | async"
      [required]="required$ | async"
      [filterCaseSensitive]="filterCaseSensitive$ | async"
      [tagging]="tagging$ | async"
      [multiple]="multiple$ | async"
      [disabled]="disabled$ | async"
    >
      <ngx-select-option
        *ngFor="let opt of options$ | async"
        [name]="opt.name"
        [value]="opt.value"
        [disabled]="opt.disabled"
        [hidden]="opt.hidden"
      ></ngx-select-option>
    </ngx-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SelectComponentFixture {
  selected = [];

  readonly identifier$ = new BehaviorSubject<string>(undefined);
  readonly minSelections$ = new BehaviorSubject(0);
  readonly maxSelections$ = new BehaviorSubject(3);
  readonly autofocus$ = new BehaviorSubject(false);
  readonly autosize$ = new BehaviorSubject(false);
  readonly allowClear$ = new BehaviorSubject(false);
  readonly allowAdditions$ = new BehaviorSubject(false);
  readonly disableDropdown$ = new BehaviorSubject(false);
  readonly closeOnSelect$ = new BehaviorSubject(false);
  readonly closeOnBodyClick$ = new BehaviorSubject(false);
  readonly filterable$ = new BehaviorSubject(false);
  readonly required$ = new BehaviorSubject(false);
  readonly filterCaseSensitive$ = new BehaviorSubject(false);
  readonly tagging$ = new BehaviorSubject(false);
  readonly multiple$ = new BehaviorSubject(false);
  readonly disabled$ = new BehaviorSubject(false);
  readonly options$ = new BehaviorSubject<SelectDropdownOption[]>([
    selectDropdownOptionMock(),
    selectDropdownOptionMock(),
    selectDropdownOptionMock()
  ]);

  @ViewChild(SelectComponent, { static: false })
  readonly select: SelectComponent;
}
