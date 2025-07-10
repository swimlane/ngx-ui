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
    component.wrapperRef = {
      open: true
    } as any;
    fixture.detectChanges();
  });

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

  it('should update selected label based on preset match', () => {
    const preset = component.presets.find(p => p.label === 'Last 7 days');
    const [start, end] = preset.range();
    component.form.startDate = start;
    component.form.endDate = end;
    component.updateSelectedLabel();
    expect(component.selectedLabel).toBe('Last 7 days');
  });

  it('should set default label when no preset matched', () => {
    const start = new Date('2022-01-01T00:00:00');
    const end = new Date('2022-01-02T00:00:00');
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
    const start = new Date('2022-01-01T00:00:00Z');
    const end = new Date('2022-01-02T00:00:00Z');

    component.form.startDate = start;
    component.form.endDate = end;

    component.updateSelectedLabel();

    expect(component.selectedLabel).toContain('2022');
  });
});
