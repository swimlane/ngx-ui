import { Component, Input, HostListener, ViewEncapsulation, OnChanges, HostBinding, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import moment from 'moment-timezone';

import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { NotificationService } from '../notification/notification.service';
import { NotificationStyleType } from '../notification/notification-style-type.enum';

import { DATE_DISPLAY_TYPES, DATE_DISPLAY_INPUT_FORMATS, DATE_DISPLAY_FORMATS } from '../../enums/date-formats.enum';
import { Datelike } from '../date-time/date-like.type';
import { DateTimeType } from '../date-time/date-time-type.enum';
import { defaultDisplayFormat, defaultInputFormat } from '../../utils/date-formats/default-formats';

const guessTimeZone = moment.tz.guess();

interface ITimeValues {
  [key: string]: {
    key: string;
    clip: string;
    display: string;
  };
}

@Component({
  selector: 'ngx-time',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class NgxTimeDisplayComponent implements OnInit, OnChanges {
  @Input()
  datetime: Datelike = new Date();

  @Input() precision: moment.unitOfTime.StartOf;

  @Input()
  timezone: string = guessTimeZone;

  @Input()
  defaultInputTimeZone: string;

  @Input()
  set mode(val: DATE_DISPLAY_TYPES) {
    this._mode = val;
  }
  get mode(): DATE_DISPLAY_TYPES {
    if (typeof this._mode === 'string') {
      return this._mode;
    }
    return DATE_DISPLAY_TYPES.TIMEZONE;
  }

  // date, time, dateTime
  @Input()
  set type(val: string) {
    this._type = val;
  }
  get type(): string {
    if (this._type) return this._type;
    return DateTimeType.datetime;
  }

  @Input()
  set format(val: string) {
    this._format = val;
  }
  get format(): string {
    if (this._format) return DATE_DISPLAY_FORMATS[this._format] || this._format;
    return defaultDisplayFormat(this.mode, this.type as DateTimeType, this.precision);
  }

  @Input()
  set tooltipFormat(val: string) {
    this._tooltipFormat = val;
  }
  get tooltipFormat(): string {
    if (this._tooltipFormat) return DATE_DISPLAY_FORMATS[this._tooltipFormat] || this._tooltipFormat;
    return this.format;
  }

  @Input()
  set clipFormat(val: string) {
    this._clipFormat = val;
  }
  get clipFormat(): string {
    if (this._clipFormat) return DATE_DISPLAY_FORMATS[this._clipFormat] || this._clipFormat;
    return defaultInputFormat(this.mode, this.type as DateTimeType, this.precision);
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
    return !this.dateInvalid && DATE_DISPLAY_TYPES.LOCAL !== this.mode;
  }

  @HostBinding('class.ngx-time--date-invalid')
  dateInvalid = true;

  timeValues: ITimeValues = {};
  titleValue = '';
  internalDatetime: Date;
  utcDatetime: string;

  readonly DATE_DISPLAY_TYPES = DATE_DISPLAY_TYPES;
  readonly DATE_DISPLAY_FORMATS = DATE_DISPLAY_FORMATS;

  private _mode: DATE_DISPLAY_TYPES;
  private _format: string;
  private _tooltipFormat: string;
  private _clipFormat: string;
  private _clickable: boolean;
  private _type: string;

  constructor(private readonly clipboard: Clipboard, private readonly notificationService: NotificationService) {}

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
    this.clipboard.copy(item.value.clip);
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

    const localTimezone = this.timezone || guessTimeZone;
    const inputTimezone = this.defaultInputTimeZone || localTimezone;

    if (DATE_DISPLAY_TYPES.LOCAL === this.mode) {
      const mdate = moment.tz(this.datetime as string, DATE_DISPLAY_INPUT_FORMATS, inputTimezone);
      this.dateInvalid = !mdate.isValid();
      this.internalDatetime = this.dateInvalid ? undefined : mdate.toDate();
      this.utcDatetime = this.dateInvalid ? '' : mdate.format('YYYY-MM-DD[T]HH:mm:ss.SSS');
      return;
    }

    const mdate = moment.tz(this.datetime as string, DATE_DISPLAY_INPUT_FORMATS, inputTimezone);
    this.dateInvalid = !mdate.isValid();
    this.internalDatetime = this.dateInvalid ? undefined : mdate.toDate();
    this.utcDatetime = this.dateInvalid ? '' : mdate.toISOString();

    if (this.dateInvalid) {
      return;
    }

    const titleValue = [];

    for (const key in this.timezones) {
      const tz = this.timezones[key] || guessTimeZone;
      const date = mdate.clone().tz(tz);
      const clip = date.format(this.clipFormat);
      const display = date.format(this.tooltipFormat);
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
