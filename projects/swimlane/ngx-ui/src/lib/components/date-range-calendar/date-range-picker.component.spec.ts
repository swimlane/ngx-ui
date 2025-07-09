import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { DateRangePickerComponent } from './date-range-picker.component';

import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

  @Component({
    selector: 'ngx-input',
    template: '',
    standalone: true,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxInputStubComponent),
        multi: true
      }
    ]
  })
  class NgxInputStubComponent {
    writeValue(_: any) {}
    registerOnChange(_: any) {}
    registerOnTouched(_: any) {}
    setDisabledState?(_: boolean) {}
  }

  @Component({
    selector: 'ngx-calendar',
    template: '',
    standalone: true,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxCalendarStubComponent),
        multi: true
      }
    ]
  })
  class NgxCalendarStubComponent implements ControlValueAccessor {
    @Input() name: string;
    @Input() range: any;
    @Input() dateLabelFormat: string;
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() selectType: string;

    writeValue(): void {}
    registerOnChange(): void {}
    registerOnTouched(): void {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateRangePickerComponent],
      imports: [FormsModule, ReactiveFormsModule, NgxInputStubComponent, NgxCalendarStubComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
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
