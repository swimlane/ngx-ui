import {
  Component, Input, Output, EventEmitter,
  forwardRef, OnInit, ViewChild, TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

import { noop } from '../../utils';
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
          (onSelect)="dateSelected($event)"
          [ngModel]="value"
          name="calendar">
        </swui-calendar>
        <nav role="navigation" class="u-textRight swui-dialog-footer">
          <button type="button" class="btn link" (click)="close()">
            Cancel
          </button>
          <button type="button" class="btn link" (click)="apply()">
            Ok
          </button>
        </nav>
      </template>
      <swui-input
        [placeholder]="inputPlaceholder"
        [ngModel]="value | amDateFormat: calendarFormat">
      </swui-input>
      <button
        title="Show calendar"
        type="button"
        (click)="open()"
        class="icon-calendar calendar-dialog-btn">
      </button>
    </div>
  `
})
export class CalendarInputComponent implements ControlValueAccessor {

  @Input() calendarFormat: string = 'LL';
  @Input() inputPlaceholder: string = 'Enter a date; e.g. 11/29/2016';

  @Output() onSelect = new EventEmitter();

  @ViewChild('dialogTpl') calendarTpl: TemplateRef<any>;

  get value() {
    return this._value;
  }

  set value(val: any) {
    if (!this.compareDates(val, this._value)) {
      // always store as raw
      if(val && val.toDate)
        val = val.toDate();

      this._value = val;
      this.onChangeCallback(this._value);
      this.onSelect.emit(this._value);
    }
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  private _value: any;
  private dialogModel: any;
  private dialog: any;

  constructor(private dialogService: DialogService) { }

  compareDates(newDate, oldDate) {
    const newVal = newDate && newDate.toString ?
      newDate.toString() : newDate;

    const oldVal = oldDate && oldDate.toString ?
      oldDate.toString() : oldDate;

    return newVal === oldVal;
  }

  writeValue(val: any) {
    if (!this.compareDates(val, this._value)) {
      // always store as raw
      if(val && val.toDate)
        val = val.toDate();

      this._value = val;
    }
  }

  open() {
    this.dialog = this.dialogService.open({
      cssClass: 'swui-calendar-dialog',
      template: this.calendarTpl
    });
  }

  apply() {
    this.value = this.dialogModel;
    this.close();
  }

  dateSelected(date) {
    this.dialogModel = date;
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

}
