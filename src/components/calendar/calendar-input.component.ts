import {
  Component, Input, Output, EventEmitter,
  forwardRef, OnInit, ViewChild, TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

import { noop, debounceable } from '../../utils';
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
          [minDate]="calendarMinDate"
          [maxDate]="calendarMaxDate"
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
        [disabled]="disabled"
        [placeholder]="inputPlaceholder"
        [ngModel]="value | amDateFormat: calendarFormat"
        (onChange)="inputChanged($event)">
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

  @Input() disabled: boolean;
  @Input() calendarMinDate: Date;
  @Input() calendarMaxDate: Date;
  @Input() calendarFormat: string = 'M/D/Y';
  @Input() inputPlaceholder: string = '';
  @Output() onSelect = new EventEmitter();
  @ViewChild('dialogTpl') calendarTpl: TemplateRef<any>;

  get value() {
    return this._value;
  }

  set value(val: any) {
    const isSame = moment(val).isSame(this._value, 'day');
    if (!isSame) {
      this._value = val;
      this.onChangeCallback(val);
      this.onSelect.emit(val);
    }
  }

  private _value: any;
  private dialogModel: any;
  private dialog: any;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

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

  @debounceable(500)
  inputChanged(val) {
    const date = moment(val);
    if(date.isValid()) {
      this.value = date.toDate();
    }
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
