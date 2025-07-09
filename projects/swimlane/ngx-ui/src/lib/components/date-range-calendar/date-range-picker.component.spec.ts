import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateRangePickerComponent } from './date-range-picker.component';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateRangePickerComponent],
      imports: [FormsModule, ReactiveFormsModule],
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

  it('should update range model on range select', () => {
    const range = {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-01-05')
    };
    component.onRangeSelect(range);
    expect(component.rangeModel.startDate).toEqual(range.startDate);
    expect(component.rangeModel.endDate).toEqual(range.endDate);
  });

  it('should update selected label based on preset match', () => {
    const preset = component.presets.find(p => p.label === 'Last 7 days');
    const [start, end] = preset.range();
    component.form.startDate = start;
    component.form.endDate = end;
    component.updateSelectedLabel();
    expect(component.selectedLabel).toBe('Last 7 days');
  });
});
