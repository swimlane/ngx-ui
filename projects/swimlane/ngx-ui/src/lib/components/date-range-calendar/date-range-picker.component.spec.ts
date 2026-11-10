import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { DateRangePickerComponent } from './date-range-picker.component';
import { InputModule } from '../input/input.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { CommonModule } from '@angular/common';
import { CalendarModule } from '../calendar/calendar.module';
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';

import { stubIntersectionObserverIfNeeded } from '../../testing/stub-intersection-observer';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

  beforeAll(() => {
    stubIntersectionObserverIfNeeded();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateRangePickerComponent],
      imports: [
        InputModule,
        DropdownModule,
        ButtonModule,
        IconModule,
        TooltipModule,
        CommonModule,
        FormsModule,
        CalendarModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
    component.wrapperRef = { open: true } as any;
    fixture.detectChanges();
  });

  function expectValidRange(start: Date | null, end: Date | null) {
    expect(start).not.toBeNull();
    expect(end).not.toBeNull();
    if (start && end) {
      expect(start <= end).toBe(true);
    }
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cancel on cancel button', () => {
    vi.spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
    expect(component.showPicker).toBe(false);
  });

  it('should emit apply with correct range', () => {
    const start = new Date('2023-01-01');
    const end = new Date('2023-01-10');
    component.form.startDate = start;
    component.form.endDate = end;
    vi.spyOn(component.apply, 'emit');
    component.onApply();
    expect(component.apply.emit).toHaveBeenCalledWith({
      start: start,
      end: end,
      label: component.selectedLabel,
      tooltipValues:
        component.timeValueStart && component.timeValueEnd
          ? { startTime: component.timeValueStart, endTime: component.timeValueEnd }
          : { startTime: {}, endTime: {} },
      startExpression: component.form.startRaw,
      endExpression: component.form.endRaw
    });
    expect(component.wrapperRef.open).toBe(false);
  });

  it('should update form and range model on valid custom input change', () => {
    component.form.startRaw = '2023-01-01';
    component.form.endRaw = '2023-01-10';
    component.onCustomInputChange();
    expect(component.form.startDate).toEqual(new Date('2023-01-01'));
    expect(component.form.endDate).toEqual(new Date('2023-01-10'));
    expect(component.validationError).toBeNull();
  });

  it('should set validation error on invalid range input', () => {
    component.form.startRaw = '2023-01-10';
    component.form.endRaw = '2023-01-01';
    component.onCustomInputChange();
    expect(component.validationError).toBe(`"From" can't be after "To"`);
  });

  it('should set validation error when custom input contains invalid dates', () => {
    component.form.startRaw = 'invalid-start';
    component.form.endRaw = 'invalid-end';
    component.onCustomInputChange();
    expect(component.validationError).toBe(`Invalid date expression`);
    expect(component.form.startDate).toBeNull();
    expect(component.form.endDate).toBeNull();
  });

  it('should handle invalid range selection where endDate < startDate', () => {
    const invalidStart = new Date('2025-07-20');
    const invalidEnd = new Date('2025-07-15'); // earlier than start

    component.onRangeSelect({ startDate: invalidStart, endDate: invalidEnd });

    const expectedStart = startOfDay(invalidStart);
    expect(component.form.startDate).toEqual(expectedStart);
    expect(component.form.endDate).toBeNull(); // reset because invalid
    expect(component.rangeModel.startDate).toEqual(expectedStart);
    expect(component.rangeModel.endDate).toEqual(expectedStart);
  });

  it('should update selected label based on preset match', () => {
    const preset = component.presets.find(p => p.label === 'Last 7 days');
    if (preset) {
      const [start, end] = preset.range();
      component.form.startDate = start;
      component.form.endDate = end;
      component.updateSelectedLabel();
      expect(component.selectedLabel).toBe('Last 7 days');
    } else {
      throw new Error('Preset "Last 7 days" not found');
    }
  });

  it('should set default label when no preset matched', () => {
    const start = new Date('2022-01-01');
    const end = new Date('2022-01-02');
    component.form.startDate = start;
    component.form.endDate = end;
    component.updateSelectedLabel();
    expect(component.selectedLabel).toContain('2022-01-01');
  });

  it('should reset to last confirmed range onCancel when present', () => {
    const confirmedStart = new Date('2023-01-01');
    const confirmedEnd = new Date('2023-01-10');
    component.lastConfirmedRange = {
      startDate: confirmedStart,
      endDate: confirmedEnd,
      startRaw: '2023-01-01',
      endRaw: '2023-01-10'
    };
    vi.spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.form.startDate).toEqual(confirmedStart);
    expect(component.form.endDate).toEqual(confirmedEnd);
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should call window.open when openSearchStringDocPage is invoked', () => {
    vi.spyOn(window, 'open');
    component.openSearchStringDocPage();
    expect(window.open).toHaveBeenCalledWith(
      'https://docs.swimlane.com/custom-and-relative-date-ranges-with-time-units',
      '_blank'
    );
  });

  it('should reset startDate and endDate properly if both were already set and new date is clicked', () => {
    const first = new Date('2024-01-01');
    const second = new Date('2024-01-05');
    const third = new Date('2024-01-10');
    component.form.startDate = first;
    component.form.endDate = second;
    component.onRangeSelect({ startDate: third, endDate: third });
    expect(component.form.startDate).toEqual(startOfDay(third));
    expect(component.form.endDate).toBeNull();
  });

  it('should normalize startDate to start of day and endDate to end of day on range selection', () => {
    const startDate = new Date('2024-03-05T14:30:00');
    const endDate = new Date('2024-03-10T09:15:00');

    // First click sets start
    component.onRangeSelect({ startDate, endDate: startDate });
    expect(component.form.startDate).toEqual(startOfDay(startDate));
    expect(component.form.endDate).toBeNull();

    // Second click sets end
    component.onRangeSelect({ startDate: endDate, endDate });
    expect(component.form.endDate).toEqual(endOfDay(endDate));
  });

  it('should update label with custom range if no preset matches', () => {
    const start = new Date('2022-01-01');
    const end = new Date('2022-01-02');
    component.form.startDate = start;
    component.form.endDate = end;
    component.updateSelectedLabel();
    expect(component.selectedLabel).toContain('2022');
  });

  it('should select the entire month for "This month" preset', () => {
    const preset = component.presets.find(p => p.label === 'This month');
    expect(preset).toBeTruthy();
    if (preset) {
      const [start, end] = preset.range();
      expect(start).toEqual(startOfMonth(new Date()));
      expect(end).toEqual(endOfMonth(new Date()));
    }
  });

  it('should correctly set range for "This week so far"', () => {
    const preset = component.presets.find(p => p.label === 'This week so far');
    expect(preset).toBeTruthy();
    if (preset) {
      const [start, end] = preset.range();
      expect(start !== null && start.getDay()).toBe(0); // Sunday
      expect(end !== null && end <= new Date()).toBe(true);
      expectValidRange(start, end);
    } else {
      throw new Error('Preset "This week so far" not found');
    }
  });

  it('should correctly set range for "Last week"', () => {
    const preset = component.presets.find(p => p.label === 'Last week');
    expect(preset).toBeTruthy();
    if (preset) {
      const [start, end] = preset.range();
      if (start) {
        expect(start.getDay()).toBe(0); // Sunday
      }
      if (end) {
        expect(end.getDay()).toBe(6); // Saturday
        expect(end < new Date()).toBe(true);
      }
      expectValidRange(start, end);
    }
  });

  it('should correctly set range for "This quarter"', () => {
    const preset = component.presets.find(p => p.label === 'This quarter');
    expect(preset).toBeTruthy();
    if (preset) {
      const [start, end] = preset.range();
      expect(start && start.getMonth() % 3).toBe(0);
      expectValidRange(start, end);
    }
  });

  it('should correctly set range for "Last quarter"', () => {
    const preset = component.presets.find(p => p.label === 'Last quarter');
    expect(preset).toBeTruthy();
    if (preset) {
      const [start, end] = preset.range();
      expect(start && start.getMonth() % 3).toBe(0);
      expectValidRange(start, end);
    } else {
      throw new Error('Preset "Last quarter" not found');
    }
  });

  it('should correctly set range for "This year so far"', () => {
    const preset = component.presets.find(p => p.label === 'This year so far');
    expect(preset).toBeTruthy();
    if (preset) {
      const [start, end] = preset.range();
      expect(start && start.getMonth()).toBe(0);
      expect(end && end <= new Date()).toBe(true);
      expectValidRange(start, end);
    }
  });

  it('should correctly set range for "Today"', () => {
    const preset = component.presets.find(p => p.label === 'Today');
    expect(preset).toBeTruthy();
    if (preset) {
      const [start, end] = preset.range();
      expect(start && start.getDate()).toBe(new Date().getDate());
      expect(end && end.getDate()).toBe(new Date().getDate());
      expectValidRange(start, end);
    }
  });

  it('should reject custom input dates after maxDate', () => {
    component.maxDate = endOfDay(new Date('2023-01-05'));
    component.form.startRaw = '2023-01-01';
    component.form.endRaw = '2023-01-10';
    component.onCustomInputChange();
    expect(component.validationError).toBe('Date cannot be after the maximum allowed date');
  });

  it('should cap the selected end date at maxDate', () => {
    const maxDate = new Date(2024, 2, 5, 10, 0, 0);
    component.maxDate = maxDate;
    component.onRangeSelect({ startDate: new Date(2024, 2, 1), endDate: new Date(2024, 2, 1) });
    component.onRangeSelect({ startDate: new Date(2024, 2, 5), endDate: new Date(2024, 2, 5) });
    expect(component.form.endDate).toEqual(maxDate);
    expect(component.validationError).toBeNull();
  });

  it('should cap calendar max dates when maxDate is set', () => {
    const maxDate = endOfDay(new Date(2024, 2, 5));
    component.maxDate = maxDate;
    component.updateCalendarConstraints(new Date(2024, 2, 1));
    expect(component.leftMaxDate).toEqual(maxDate);
    expect(component.rightMaxDate).toEqual(maxDate);
  });

  it('should hide presets that extend beyond maxDate', () => {
    const maxDate = endOfDay(new Date());
    component.maxDate = maxDate;
    component.ngOnChanges({ maxDate: new SimpleChange(null, maxDate, false) });
    const labels = component.availablePresets.map(p => p.label);
    expect(labels).not.toContain('Tomorrow');
    expect(labels).not.toContain('Next week');
    expect(labels).toContain('Today');
    expect(labels).toContain('Custom range');
  });

  it('should reject custom input dates before minDate', () => {
    component.minDate = startOfDay(new Date(2023, 0, 5));
    component.form.startRaw = '2023-01-01';
    component.form.endRaw = '2023-01-10';
    component.onCustomInputChange();
    expect(component.validationError).toBe('Date cannot be before the minimum allowed date');
  });

  it('should cap the selected start date at minDate', () => {
    const minDate = new Date(2024, 2, 5, 10, 0, 0);
    component.minDate = minDate;
    component.onRangeSelect({ startDate: new Date(2024, 2, 5), endDate: new Date(2024, 2, 5) });
    expect(component.form.startDate).toEqual(minDate);
    expect(component.validationError).toBeNull();
  });

  it('should complete a single-day range on the minDate day', () => {
    const minDate = new Date(2024, 2, 5, 10, 0, 0);
    component.minDate = minDate;
    component.onRangeSelect({ startDate: new Date(2024, 2, 5), endDate: new Date(2024, 2, 5) });
    component.onRangeSelect({ startDate: new Date(2024, 2, 5), endDate: new Date(2024, 2, 5) });
    expect(component.form.startDate).toEqual(minDate);
    expect(component.form.endDate).toEqual(endOfDay(new Date(2024, 2, 5)));
  });

  it('should apply minDate to calendar min dates', () => {
    const minDate = startOfDay(new Date(2024, 2, 10));
    component.minDate = minDate;
    component.updateCalendarConstraints(new Date(2024, 2, 1));
    expect(component.leftMinDate).toEqual(minDate);
    expect(component.rightMinDate).toEqual(startOfMonth(new Date(2024, 3, 1)));

    const laterMinDate = startOfDay(new Date(2024, 3, 10));
    component.minDate = laterMinDate;
    component.updateCalendarConstraints(new Date(2024, 2, 1));
    expect(component.rightMinDate).toEqual(laterMinDate);
  });

  it('should hide presets that start before minDate', () => {
    const minDate = startOfDay(new Date());
    component.minDate = minDate;
    component.ngOnChanges({ minDate: new SimpleChange(null, minDate, false) });
    const labels = component.availablePresets.map(p => p.label);
    expect(labels).not.toContain('Yesterday');
    expect(labels).not.toContain('Last week');
    expect(labels).toContain('Today');
    expect(labels).toContain('Today so far');
    expect(labels).toContain('Custom range');
  });
});
