/**
 * DateRangePickerComponent
 * ------------------------
 * A fully configurable, Angular component to pick and emit a date range.
 *
 *  Usage:
 * <ngx-date-range-picker
 *   [presets]="customPresets"                     // Optional: override default presets
 *   [parseFn]="customParseFunction"               // Optional: function to parse expressions like now-7d
 *   [showTooltip]="true"                          // Optional: toggle tooltip
 *   [placeholders]="{ start: 'Start...', end: 'End...' }" // Optional: custom input placeholders
 *   (apply)="handleApply($event)"
 *   (cancel)="handleCancel()"
 * ></ngx-date-range-picker>
 *
 * This component is designed for reusability and composability in libraries and apps.
 */

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DateRangeForm, TooltipDateItem } from './models/date-range.model';

import { addMonths, endOfMonth, format, isValid, startOfMonth } from 'date-fns';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DateUtils } from './services/date-utils.service';
import moment from 'moment-timezone';
import { Clipboard } from '@angular/cdk/clipboard';
import { NotificationService } from '../notification/notification.service';
import { Datelike } from '../date-time/date-like.type';
import { DATE_DISPLAY_FORMATS } from '../../enums/date-formats.enum';
import { NotificationStyleType } from '../notification/notification-style-type.enum';

const guessTimeZone = moment.tz.guess();

@Component({
  selector: 'ngx-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class DateRangePickerComponent implements OnInit {
  @Input() presets: {
    label: string;
    range: () => [Date | null, Date | null];
    expression?: { start: string; end: string };
  }[] = DateUtils.getDefaultPresets(DateUtils.parseExpression);
  @Input() parseFn: (expr: string) => Date = DateUtils.parseExpression;
  @Input() showTooltip = true;
  @Input() placeholders = { start: 'Start (e.g., now-7d)', end: 'End (e.g., now)' };
  @Input()
  timezones: Record<string, string> = {
    UTC: 'Etc/UTC',
    Local: ''
  };
  @Input() selectedRange: { start: string; end: string } | null = null;

  @Output() apply = new EventEmitter<{
    start: Date;
    end: Date;
    label: string;
    tooltipValues: {
      startTime: Record<string, { key: string; clip: string; display: string }>;
      endTime: Record<string, { key: string; clip: string; display: string }>;
    };
    startExpression: string;
    endExpression: string;
  }>();
  @Output() cancel = new EventEmitter<string>();
  @ViewChild('wrapperRef', { static: false }) wrapperRef!: DropdownComponent;

  private readonly dateFormat: string = 'yyyy-MM-dd HH:mm:ss';
  lastConfirmedRange: { startDate: Date; endDate: Date } = null;

  form: DateRangeForm = { startRaw: '', endRaw: '', startDate: null, endDate: null };

  showPicker = false;
  validationError: string | null = null;
  selectedPreset = null;
  selectedLabel = 'Select a range';
  pickerStyles: { [key: string]: string } = {};
  rangeModel: { startDate: Date; endDate: Date } = { startDate: new Date(), endDate: new Date() };
  rangeModelRightCalendar: { startDate: Date; endDate: Date } = { startDate: null, endDate: null };

  leftViewDate = new Date();
  rightViewDate = addMonths(new Date(), 1);

  // Left calendar constraints (current month)
  leftMinDate = null;
  leftMaxDate = endOfMonth(new Date());

  // Right calendar constraints (next month and beyond)
  nextMonth: Date = addMonths(new Date(), 1);
  rightMinDate = startOfMonth(this.nextMonth);
  rightMaxDate = null; // No upper limit or set manually
  timeValueStart: Record<string, { key: string; clip: string; display: string }> = {};
  timeValueEnd: Record<string, { key: string; clip: string; display: string }> = {};

  get isApplyDisabled(): boolean {
    if (this.validationError) return true;

    if (!this.form.startRaw?.trim() || !this.form.endRaw?.trim()) return true;

    // If no start or end date selected
    if (!this.form.startDate || !this.form.endDate) return true;

    // If nothing changed compared to last confirmed range
    if (
      this.lastConfirmedRange &&
      this.lastConfirmedRange.startDate?.getTime() === this.form.startDate.getTime() &&
      this.lastConfirmedRange.endDate?.getTime() === this.form.endDate.getTime()
    ) {
      return true;
    }

    return false;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private readonly clipboard: Clipboard,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit() {
    if (this.selectedRange) {
      this.form.startRaw = this.selectedRange.start;
      this.form.endRaw = this.selectedRange.end;
      this.form.startDate = this.parseFn(this.selectedRange.start);
      this.form.endDate = this.parseFn(this.selectedRange.end);
    }
  }

  onRangeSelect(range: { startDate: Date; endDate: Date }) {
    // If both dates already exist & user clicks again → reset to new start
    if (this.form.startDate && this.form.endDate) {
      this.form.startDate = range.startDate;
      this.form.endDate = null;
    } else if (!this.form.startDate || (this.form.startDate && range.startDate < this.form.startDate)) {
      // If startDate is not yet set, or clicked date is before current startDate
      this.form.startDate = range.startDate;
      this.form.endDate = null;
    } else {
      // Otherwise, set endDate
      this.form.endDate = range.startDate;
    }

    this.rangeModel = {
      startDate: this.form.startDate,
      endDate: this.form.endDate || this.form.startDate
    };

    this.form.startRaw = this.form.startDate ? format(this.form.startDate, this.dateFormat) : '';
    this.form.endRaw = this.form.endDate ? format(this.form.endDate, this.dateFormat) : '';

    this.updateSelectedPresetByValue();
    this.validationError = null;
    this.cdr.detectChanges();
  }

  onCustomInputChange() {
    const start = this.parseFn(this.form.startRaw);
    const end = this.parseFn(this.form.endRaw);

    if (!start || !end || !isValid(start) || !isValid(end)) {
      this.validationError = `Invalid date expression`;
      return;
    }

    if (start && end && start <= end) {
      this.validationError = null;
      this.form.startDate = start;
      this.form.endDate = end;
      this.rangeModel = { startDate: start, endDate: end };
      this.updateSelectedPresetByValue();
      this.cdr.detectChanges();
    } else {
      this.validationError = `"From" can't be after "To"`;
    }
  }

  updateSelectedLabel() {
    const { startDate, endDate } = this.form;
    if (startDate && endDate) {
      const matched = this.presets.find(preset => {
        const [pStart, pEnd] = preset.range();
        return pStart && pEnd && this.isEqual(pStart, startDate) && this.isEqual(pEnd, endDate);
      });
      this.selectedLabel = matched
        ? matched.label
        : `${format(startDate, this.dateFormat)} to ${format(endDate, this.dateFormat)}`;
    }
  }

  private createMoment(date: Datelike): moment.Moment {
    let momentDate = moment(date).clone();
    const timezone = guessTimeZone;
    momentDate = timezone ? momentDate.tz(timezone) : momentDate;
    return momentDate;
  }

  updateSelectedPresetByValue() {
    const { startDate, endDate } = this.form;
    const matched = this.presets.find(p => {
      const [s, e] = p.range();
      return s && e && this.isEqual(s, startDate) && this.isEqual(e, endDate);
    });
    this.setTooltipDate(this.form.startDate, this.form.endDate);
    this.selectedPreset = matched?.label || 'Custom range';
  }

  selectPreset(preset: {
    label: string;
    range: () => [Date | null, Date | null];
    expression?: { start: string; end: string };
  }) {
    const [start, end] = preset.range();
    if (start && end) {
      this.form.startDate = start;
      this.form.endDate = end;
      this.rangeModel = { startDate: start, endDate: end };

      this.form.startRaw = preset.expression?.start ?? format(start, this.dateFormat);
      this.form.endRaw = preset.expression?.end ?? format(end, this.dateFormat);
      this.setTooltipDate(this.form.startDate, this.form.endDate);

      this.validationError = null;
      this.selectedPreset = preset.label;
      this.cdr.detectChanges();
    }
  }

  isEqual(a: Date, b: Date): boolean {
    return a && b && Math.abs(a.getTime() - b.getTime()) < 60000;
  }

  onApply() {
    if (this.form.startDate && this.form.endDate) {
      this.lastConfirmedRange = {
        startDate: this.form.startDate,
        endDate: this.form.endDate
      };
      this.updateSelectedLabel();
      this.apply.emit({
        start: this.form.startDate,
        end: this.form.endDate,
        label: this.selectedLabel,
        tooltipValues: { startTime: this.timeValueStart, endTime: this.timeValueEnd },
        startExpression: this.form.startRaw,
        endExpression: this.form.endRaw
      });
      this.wrapperRef.open = false;
    }
  }

  onCancel() {
    if (this.lastConfirmedRange) {
      this.form = {
        startDate: this.lastConfirmedRange.startDate,
        endDate: this.lastConfirmedRange.endDate,
        startRaw: format(this.lastConfirmedRange.startDate, this.dateFormat),
        endRaw: format(this.lastConfirmedRange.endDate, this.dateFormat)
      };
      this.rangeModel = { ...this.lastConfirmedRange };
    } else {
      // First-time cancel before any apply: reset form
      this.form = {
        startDate: null,
        endDate: null,
        startRaw: '',
        endRaw: ''
      };
      this.rangeModel = { startDate: new Date(), endDate: new Date() };
      this.selectedPreset = 'Custom range';
      this.selectedLabel = 'Select a range';
    }

    this.validationError = null;
    this.updateSelectedLabel();
    this.cancel.emit(this.selectedLabel);
    this.wrapperRef.open = false;
  }

  resetForm() {
    this.form = {
      startDate: null,
      endDate: null,
      startRaw: '',
      endRaw: ''
    };
    this.rangeModel = { startDate: new Date(), endDate: new Date() };
    this.validationError = null;
    this.selectedPreset = 'Custom range';
    this.selectedLabel = 'Select a range';
    this.cdr.detectChanges();
    this.apply.emit({
      start: null,
      end: null,
      label: this.selectedLabel,
      tooltipValues: { startTime: {}, endTime: {} },
      startExpression: null,
      endExpression: null
    });
    this.lastConfirmedRange = null;
  }

  openSearchStringDocPage() {
    window.open('https://docs.swimlane.com/turbine/workspaces-and-dashboards/date-range.htm', '_blank');
  }

  setTooltipDate(start: Date, end: Date) {
    this.timeValueEnd = {};
    this.timeValueStart = {};
    if (start) {
      const startMoment = this.createMoment(start);
      this.timeValueStart = Object.keys(this.timezones).reduce((timezoneAcc, timezoneKey) => {
        const timezoneValue = this.timezones[timezoneKey] || guessTimeZone;
        const dateInTimezone = startMoment.clone().tz(timezoneValue);
        timezoneAcc[timezoneKey] = {
          key: timezoneKey,
          clip: dateInTimezone.format(DATE_DISPLAY_FORMATS.fullDateTime),
          display: dateInTimezone.format(DATE_DISPLAY_FORMATS.fullDateTime)
        };
        return timezoneAcc;
      }, {} as Record<string, { key: string; clip: string; display: string }>);
    }
    if (end) {
      const endMoment = this.createMoment(end);
      this.timeValueEnd = Object.keys(this.timezones).reduce((timezoneAcc, timezoneKey) => {
        const timezoneValue = this.timezones[timezoneKey] || guessTimeZone;
        const dateInTimezone = endMoment.clone().tz(timezoneValue);
        timezoneAcc[timezoneKey] = {
          key: timezoneKey,
          clip: dateInTimezone.format(DATE_DISPLAY_FORMATS.fullDateTime),
          display: dateInTimezone.format(DATE_DISPLAY_FORMATS.fullDateTime)
        };
        return timezoneAcc;
      }, {} as Record<string, { key: string; clip: string; display: string }>);
    }
    this.cdr.detectChanges();
  }

  onClick(item: TooltipDateItem) {
    this.clipboard.copy(item.value.clip);
    this.notificationService.create({
      body: `${item.key} date copied to clipboard`,
      styleType: NotificationStyleType.success,
      timeout: 3000
    });
  }
}
