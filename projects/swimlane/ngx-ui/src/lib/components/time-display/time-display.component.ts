import { Component, Input, HostListener, ViewEncapsulation, OnChanges, HostBinding, OnInit } from '@angular/core';

import { ClipboardService } from 'ngx-clipboard';
import momentTimezone from 'moment-timezone';

import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { NotificationService } from '../notification/notification.service';
import { NotificationStyleType } from '../notification/notification-style-type.enum';

import { DATE_DISPLAY_TYPES, DATE_DISPLAY_INPUT_FORMATS, DATE_DISPLAY_FORMATS } from './date-formats.enum';
import { Datelike } from '../date-time/date-like.type';

@Component({
  selector: 'ngx-time',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxTimeDisplayComponent implements OnInit, OnChanges {
  @Input()
  datetime: Datelike = new Date();

  @Input()
  defaultInputTimeZone: string;

  @Input()
  displayTimeZone: string;

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
    return DATE_DISPLAY_FORMATS[this._displayFormat] || this._displayFormat || DATE_DISPLAY_FORMATS.fullLocale;
  }

  @Input()
  set clipFormat(val: string) {
    this._clipFormat = val;
  }
  get clipFormat(): string {
    return DATE_DISPLAY_FORMATS[this._clipFormat] || this._clipFormat || DATE_DISPLAY_FORMATS.fullLocale;
  }

  @Input()
  timezones: Record<string, string> = {
    UTC: 'Etc/UTC',
    Local: ''
  };

  @Input()
  tooltipTemplate: string;

  @HostBinding('class.ngx-time--tooltip-disabled')
  @Input()
  @CoerceBooleanProperty()
  tooltipDisabled = false;

  @Input()
  tooltipCssClass = 'date-tip-tooltip';

  @Input()
  tooltipPlacement = 'top';

  @Input()
  defaultCopyKey = 'Local';

  @Input()
  invalidDateMessage = 'Invalid date';

  @HostBinding('class.ngx-time--clickable')
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

  @HostBinding('class.ngx-time--has-popup')
  get hasPopup() {
    return !this.dateInvalid && DATE_DISPLAY_TYPES.LOCAL !== this.displayMode;
  }

  @HostBinding('class.ngx-time--date-invalid')
  dateInvalid = true;

  timeValues = {};
  titleValue = '';
  internalDatetime: Date;
  utcDatetime: string;

  readonly DATE_DISPLAY_TYPES = DATE_DISPLAY_TYPES;
  readonly DATE_DISPLAY_FORMATS = DATE_DISPLAY_FORMATS;

  private _displayMode: DATE_DISPLAY_TYPES;
  private _displayFormat: string;
  private _clipFormat: string;
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
    this.clipboardService.copyFromContent(item.value.clip);
    this.notificationService.create({
      body: `${item.key} date copied to clipboard`,
      styleType: NotificationStyleType.success,
      timeout: 3000
    });
  }

  private update() {
    this.internalDatetime = undefined;
    this.timeValues = {};
    this.titleValue = '';
    this.dateInvalid = true;
    this.utcDatetime = '';

    if (!this.datetime) {
      return;
    }

    if (DATE_DISPLAY_TYPES.LOCAL === this.displayMode) {
      const mdate = momentTimezone(this.datetime);
      this.dateInvalid = !mdate.isValid();
      this.internalDatetime = this.dateInvalid ? undefined : mdate.toDate();
      this.utcDatetime = this.dateInvalid ? '' : mdate.format('YYYY-MM-DD[T]HH:mm:ss.SSS');
      return;
    }

    const localTimezone = momentTimezone.tz.guess();
    const inputTimezone = this.defaultInputTimeZone || localTimezone;

    const mdate = momentTimezone.tz(this.datetime as string, DATE_DISPLAY_INPUT_FORMATS, inputTimezone);
    this.dateInvalid = !mdate.isValid();
    this.internalDatetime = this.dateInvalid ? undefined : mdate.toDate();
    this.utcDatetime = this.dateInvalid ? '' : mdate.toISOString();

    if (this.dateInvalid) {
      return;
    }

    const titleValue = [];

    for (const key in this.timezones) {
      const tz = this.timezones[key] || localTimezone;
      const date = mdate.clone().tz(tz);
      const clip = date.format(this.clipFormat);
      const display = date.format(this.displayFormat);
      this.timeValues[key] = {
        key,
        clip,
        display
      };
      titleValue.push(`${display} [${key}]`);
    }
    this.titleValue = titleValue.join('\n');
  }
}
