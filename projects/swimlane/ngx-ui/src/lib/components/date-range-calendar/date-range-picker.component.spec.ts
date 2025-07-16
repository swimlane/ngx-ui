import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateRangePickerComponent } from './date-range-picker.component';
import { InputModule } from '../input/input.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { CommonModule } from '@angular/common';
import { CalendarModule } from '../calendar/calendar.module';
import { endOfMonth, startOfMonth } from 'date-fns';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

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
      expect(start <= end).toBeTrue();
    }
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cancel on cancel button', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
    expect(component.showPicker).toBe(false);
  });

  it('should emit apply with correct range', () => {
    const start = new Date('2023-01-01');
    const end = new Date('2023-01-10');
    component.form.startDate = start;
    component.form.endDate = end;
    spyOn(component.apply, 'emit');
    component.onApply();
    expect(component.apply.emit).toHaveBeenCalledWith({ start, end, label: component.selectedLabel });
    expect(component.showPicker).toBe(false);
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
    expect(component.validationError).toBe(`Invalid date string entered`);
    expect(component.form.startDate).toBeNull();
    expect(component.form.endDate).toBeNull();
  });

  it('should handle invalid range selection where endDate < startDate', () => {
    const invalidStart = new Date('2025-07-20');
    const invalidEnd = new Date('2025-07-15'); // earlier than start

    component.onRangeSelect({ startDate: invalidStart, endDate: invalidEnd });

    expect(component.form.startDate).toEqual(invalidStart);
    expect(component.form.endDate).toBeNull(); // reset because invalid
    expect(component.rangeModel.startDate).toEqual(invalidStart);
    expect(component.rangeModel.endDate).toEqual(invalidStart);
  });

  it('should update selected label based on preset match', () => {
    const preset = component.presets.find(p => p.label === 'Last 7 days');
    const [start, end] = preset.range();
    component.form.startDate = start;
    component.form.endDate = end;
    component.updateSelectedLabel();
    expect(component.selectedLabel).toBe('Last 7 days');
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
    component.lastConfirmedRange = { startDate: confirmedStart, endDate: confirmedEnd };
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.form.startDate).toEqual(confirmedStart);
    expect(component.form.endDate).toEqual(confirmedEnd);
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should call window.open when openSearchStringDocPage is invoked', () => {
    spyOn(window, 'open');
    component.openSearchStringDocPage();
    expect(window.open).toHaveBeenCalledWith(
      'https://docs.swimlane.com/turbine/workspaces-and-dashboards/date-range.htm',
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
    expect(component.form.startDate).toEqual(third);
    expect(component.form.endDate).toBeNull();
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
    const [start, end] = preset.range();
    expect(start).toEqual(startOfMonth(new Date()));
    expect(end).toEqual(endOfMonth(new Date()));
  });

  it('should have valid start and end for each preset', () => {
    for (const preset of component.presets) {
      const [start, end] = preset.range();
      expectValidRange(start, end);
      expect(preset.label).toBeTruthy();
    }
  });

  it('should correctly set range for "This Week So Far"', () => {
    const preset = component.presets.find(p => p.label === 'This Week So Far');
    expect(preset).toBeTruthy();
    const [start, end] = preset.range();
    expect(start.getDay()).toBe(0); // Sunday
    expect(end <= new Date()).toBeTrue();
    expectValidRange(start, end);
  });

  it('should correctly set range for "Last Week"', () => {
    const preset = component.presets.find(p => p.label === 'Last Week');
    expect(preset).toBeTruthy();
    const [start, end] = preset.range();
    expect(start.getDay()).toBe(0); // Sunday
    expect(end.getDay()).toBe(6); // Saturday
    expect(end < new Date()).toBeTrue();
    expectValidRange(start, end);
  });

  it('should correctly set range for "This Quarter"', () => {
    const preset = component.presets.find(p => p.label === 'This Quarter');
    expect(preset).toBeTruthy();
    const [start, end] = preset.range();
    expect(start.getMonth() % 3).toBe(0);
    expectValidRange(start, end);
  });

  it('should correctly set range for "Last Quarter"', () => {
    const preset = component.presets.find(p => p.label === 'Last Quarter');
    expect(preset).toBeTruthy();
    const [start, end] = preset.range();
    expect(start.getMonth() % 3).toBe(0);
    expectValidRange(start, end);
  });

  it('should correctly set range for "This Year So Far"', () => {
    const preset = component.presets.find(p => p.label === 'This Year So Far');
    expect(preset).toBeTruthy();
    const [start, end] = preset.range();
    expect(start.getMonth()).toBe(0);
    expect(end <= new Date()).toBeTrue();
    expectValidRange(start, end);
  });

  it('should correctly set range for "Today"', () => {
    const preset = component.presets.find(p => p.label === 'Today');
    expect(preset).toBeTruthy();
    const [start, end] = preset.range();
    expect(start.getDate()).toBe(new Date().getDate());
    expect(end.getDate()).toBe(new Date().getDate());
    expectValidRange(start, end);
  });
});
