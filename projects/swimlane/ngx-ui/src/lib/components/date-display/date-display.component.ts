import { Component, Input, HostListener, ViewEncapsulation, OnChanges, HostBinding, OnInit } from '@angular/core';

import { ClipboardService } from 'ngx-clipboard';
import moment from 'moment-timezone';

import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { NotificationService } from '../notification/notification.service';
import { NotificationStyleType } from '../notification/notification-style-type.enum';

import { DATE_DISPLAY_TYPES, DATE_DISPLAY_INPUT_FORMATS, DATE_DISPLAY_FORMATS } from './date-formats.enum';

@Component({
  selector: 'ngx-date-display',
  templateUrl: './date-display.component.html',
  styleUrls: ['./date-display.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxDateDisplayComponent implements OnInit, OnChanges {
  @Input()
  set date(val: Date | string) {
    if (typeof val === 'string') {
      // ensure values without time zone offset are read as UTC
      const mdate = moment.utc(val, DATE_DISPLAY_INPUT_FORMATS);
      if (mdate.isValid()) {
        val = mdate.toDate();
      }
    }
    this._date = val as Date;
  }
  get date(): Date {
    return this._date;
  }

  @Input()
  set displayMode(val: DATE_DISPLAY_TYPES) {
    this._displayMode = val;
  }
  get displayMode(): DATE_DISPLAY_TYPES {
    if (typeof this._displayMode === 'string') {
      return this._displayMode;
    }
    return DATE_DISPLAY_TYPES.USER;
  }

  @Input()
  set displayFormat(val: string) {
    this._displayFormat = val;
  }
  get displayFormat(): string {
    return DATE_DISPLAY_FORMATS[this._displayFormat] || this._displayFormat;
  }

  @Input()
  set clipFormat(val: string) {
    this._clipFormat = val;
  }
  get clipFormat(): string {
    return DATE_DISPLAY_FORMATS[this._clipFormat] || this._clipFormat;
  }

  @Input()
  userTimeZone = moment.tz.guess();

  @Input()
  timezones: Record<string, string> = {
    UTC: 'Etc/UTC',
    Local: this.userTimeZone
  };

  @Input()
  tooltipTemplate: string;

  @HostBinding('class.ngx-date-display--tooltip-disabled')
  @Input()
  @CoerceBooleanProperty()
  tooltipDisabled = false;

  @Input()
  tooltipCssClass = 'date-tip-tooltip';

  @Input()
  tooltipPlacement = 'top';

  @Input()
  defaultCopyKey = 'Local';

  @HostBinding('class.ngx-date-display--clickable')
  @Input()
  get clickable(): boolean {
    if (typeof this._clickable !== 'undefined') {
      return this._clickable;
    }
    return !!this.defaultCopyKey && !!this.timeValues[this.defaultCopyKey];
  }
  set clickable(val: boolean) {
    this._clickable = val;
  }

  @HostBinding('class.ngx-date-display--date-valid')
  dateValid = false;

  timeValues = {};
  titleValue = '';

  readonly DATE_DISPLAY_TYPES = DATE_DISPLAY_TYPES;
  readonly DATE_DISPLAY_FORMATS = DATE_DISPLAY_FORMATS;

  private _date = new Date();
  private _displayMode: DATE_DISPLAY_TYPES;
  private _displayFormat: string = DATE_DISPLAY_FORMATS.fullDateTime;
  private _clipFormat: string = DATE_DISPLAY_FORMATS.shortDateTime;
  private _clickable: boolean;

  constructor(private clipboardService: ClipboardService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  @HostListener('click')
  click() {
    if (this.clickable) {
      this.onClick({
        key: this.defaultCopyKey,
        value: this.timeValues[this.defaultCopyKey]
      });
    }
  }

  onClick(item: any) {
    this.clipboardService.copyFromContent(item.value.short);
    this.notificationService.create({
      body: `${item.key} date copied to clipboard`,
      styleType: NotificationStyleType.success,
      timeout: 3000
    });
  }

  private update() {
    this.timeValues = {};
    this.titleValue = '';
    this.dateValid = false;

    if (!this.date) {
      return;
    }

    const titleValue = [];

    const mdate = moment.utc(this.date);
    this.dateValid = mdate.isValid();

    if (!this.dateValid) {
      return;
    }

    for (const key in this.timezones) {
      const date = mdate.clone().tz(this.timezones[key]);
      const item = (this.timeValues[key] = {
        key,
        short: date.format(this.clipFormat),
        full: date.format(this.displayFormat)
      });
      titleValue.push(`${item.full} [${item.key}]`);
    }
    this.titleValue = titleValue.join('\n');
  }
}
