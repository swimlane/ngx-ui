import {
  Component, Input, Output, EventEmitter,
  forwardRef, OnInit, ViewChild, TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

import { debounceable } from '../../utils';
import { DialogService } from '../dialog';
import './calendar-input.scss';

const CALENDAR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarInputComponent),
  multi: true
};

@Component({
  selector: 'swui-calendar-input',
  providers: [CALENDAR_VALUE_ACCESSOR],
  template: `
    <div class="swui-calendar-input">
      <template #dialogTpl>
        <swui-calendar
          (change)="dateSelected($event)"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [ngModel]="value"
          name="calendar">
        </swui-calendar>
        <nav role="navigation" class="u-textRight swui-dialog-footer">
          <button type="button" class="btn btn-link" (click)="close()">
            Cancel
          </button>
          <button type="button" class="btn btn-link" (click)="apply()">
            Ok
          </button>
        </nav>
      </template>
      <swui-input
        [autocorrect]="false"
        [autocomplete]="false"
        [spellcheck]="false"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [autofocus]="autofocus"
        [tabindex]="tabindex"
        [label]="label"
        [ngModel]="value | amDateFormat: format"
        (onChange)="inputChanged($event)">
        <swui-input-hint>
          <div class="u-flex u-flexRow">
            <div
              class="FlexItem u-textLeft u-flexExpandRight"
              *ngIf="hint">
              {{hint}}
            </div>
            <div
              class="FlexItem input-error u-textRight u-flexExpandLeft"
              *ngIf="error">
              {{error}}
            </div>
          </div>
        </swui-input-hint>
      </swui-input>
      <button
        title="Show calendar"
        type="button"
        [disabled]="disabled"
        (click)="open()"
        class="icon-field-date calendar-dialog-btn">
      </button>
    </div>
  `
})
export class CalendarInputComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() disabled: boolean;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() hint: string;
  @Input() format: string = 'M/D/Y';
  @Input() placeholder: string = '';
  @Input() tabindex: number;
  @Input() autofocus: boolean = false;

  @Output() change = new EventEmitter();

  @ViewChild('dialogTpl')
  calendarTpl: TemplateRef<any>;

  get value() {
    return this._value;
  }

  set value(val: any) {
    const isSame = moment(val).isSame(this._value, 'day');
    if (!isSame) {
      this._value = val;
      this.onChangeCallback(val);
      this.change.emit(val);
    }
  }

  private _value: any;
  private dialogModel: any;
  private dialog: any;
  private error: string;

  constructor(private dialogService: DialogService) { }

  writeValue(val: any) {
    const isSame = moment(val).isSame(this._value, 'day');
    if (!isSame) {
      this._value = val;
    }
  }

  open() {
    this.dialog = this.dialogService.open({
      cssClass: 'swui-calendar-dialog',
      template: this.calendarTpl,
      closeButton: false
    });
  }

  apply() {
    this.value = this.dialogModel;
    this.close();
  }

  dateSelected(date) {
    this.dialogModel = date;
  }

  getDayDisabled(date) {
    if(!date) return false;

    const isBeforeMin = this.minDate && date.isSameOrBefore(this.minDate);
    const isAfterMax = this.maxDate && date.isSameOrAfter(this.maxDate);

    return isBeforeMin || isAfterMax;
  }

  @debounceable(500)
  inputChanged(val) {
    const date = moment(val);
    const invalidDate = date.isValid();
    const outOfRange = this.getDayDisabled(date);

    if(invalidDate && !outOfRange) {
      this.value = date.toDate();
    }

    let errorMsg;
    if(invalidDate) errorMsg = 'Invalid Date';
    if(outOfRange) errorMsg = 'Date out of range';
    this.error = errorMsg;
  }

  close() {
    this.dialogService.destroy(this.dialog.instance.id);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

}
