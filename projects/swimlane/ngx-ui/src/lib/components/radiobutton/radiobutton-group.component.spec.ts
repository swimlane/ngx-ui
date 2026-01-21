import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RadioButtonGroupComponentFixture } from './radiobutton-group.component.fixture';

describe('RadioButtonGroupComponent', () => {
  let component: RadioButtonGroupComponentFixture;
  let fixture: ComponentFixture<RadioButtonGroupComponentFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RadioButtonGroupComponentFixture]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonGroupComponentFixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('name', () => {
    it('should get name', () => {
      expect(component.radioButtonGroup.name).toBe(component.name$.value);
    });

    it('should not set name if not changed', () => {
      const spy = vi.spyOn(component.radioButtonGroup._radios, 'forEach');
      component.radioButtonGroup.name = component.name$.value;
      expect(spy).not.toHaveBeenCalled();
    });

    it('should set name', () => {
      component.radioButtonGroup.name = 'test2';
      component.radioButtonGroup.value = 'two';
      expect(component.radioButtonGroup.selected.name).toEqual(component.radioButtonGroup.name);
    });
  });

  describe('value', () => {
    it('should should not set value if unchanged', () => {
      const spy = vi.spyOn(component.radioButtonGroup.change, 'emit');
      component.radioButtonGroup.value = component.value;
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onRadioSelected', () => {
    it('should select radio button', async () => {
      component.radioButtonGroup.onRadioSelected('one');

      setTimeout(() => {
        expect(component.radioButtonGroup.selected.value).toEqual(component.value as any);
      });
    });
  });
});
