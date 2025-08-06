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

import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateRangeForm } from './models/date-range.model';

import { addMonths, endOfMonth, format, isValid, startOfMonth } from 'date-fns';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DateUtils } from './services/date-utils.service';
import moment from 'moment-timezone';
import { DATE_DISPLAY_FORMATS, Datelike, NotificationService, NotificationStyleType } from '@swimlane/ngx-ui';
import { Clipboard } from '@angular/cdk/clipboard';

const guessTimeZone = moment.tz.guess();

@Component({
  selector: 'ngx-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class DateRangePickerComponent {
  @Input() presets: {
    label: string;
    range: () => [Date | null, Date | null];
    expression?: { start: string; end: string };
  }[] = DateUtils.getDefaultPresets(DateUtils.parseExpression);
  @Input() parseFn: (expr: string) => Date = DateUtils.parseExpression;
  @Input() showTooltip = true;
  @Input() placeholders = { start: 'Start (e.g., now-7d)', end: 'End (e.g., now)' };

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
  @Input()
  timezones: Record<string, string> = {
    UTC: 'Etc/UTC',
    Local: ''
  };

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
  timeValueStart = {};
  timeValueEnd = {};

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
    let m = moment(date).clone();
    const timezone = guessTimeZone;
    m = timezone ? m.tz(timezone) : m;
    return m;
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

      if (preset.expression) {
        this.form.startRaw = preset.expression.start;
        this.form.endRaw = preset.expression.end;
      } else {
        this.form.startRaw = format(start, this.dateFormat);
        this.form.endRaw = format(end, this.dateFormat);
      }

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
      const mStartDate = this.createMoment(start);
      this.timeValueStart = Object.keys(this.timezones).reduce((acc, key) => {
        const tz = this.timezones[key] || guessTimeZone;
        const date = mStartDate.clone().tz(tz);
        acc[key] = {
          key,
          clip: date.format(DATE_DISPLAY_FORMATS.fullDateTime),
          display: date.format(DATE_DISPLAY_FORMATS.fullDateTime)
        };
        return acc;
      }, {} as Record<string, { key: string; clip: string; display: string }>);
    }
    if (end) {
      const mStartEnd = this.createMoment(end);
      this.timeValueEnd = Object.keys(this.timezones).reduce((acc, key) => {
        const tz = this.timezones[key] || guessTimeZone;
        const date = mStartEnd.clone().tz(tz);
        acc[key] = {
          key,
          clip: date.format(DATE_DISPLAY_FORMATS.fullDateTime),
          display: date.format(DATE_DISPLAY_FORMATS.fullDateTime)
        };
        return acc;
      }, {} as Record<string, { key: string; clip: string; display: string }>);
    }
    this.cdr.detectChanges();
  }

  onClick(item: any) {
    this.clipboard.copy(item.value.clip);
    this.notificationService.create({
      body: `${item.key} date copied to clipboard`,
      styleType: NotificationStyleType.success,
      timeout: 3000
    });
  }
}
