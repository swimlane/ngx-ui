import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RadioButtonGroupComponent } from './radiobutton-group.component';
import { RadioButtonComponent } from './radiobutton.component';
import { RadioButtonGroupComponentFixture } from './radiobutton-group.component.fixture';

describe('RadioButtonGroupComponent', () => {
  let component: RadioButtonGroupComponentFixture;
  let fixture: ComponentFixture<RadioButtonGroupComponentFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule],
      declarations: [RadioButtonGroupComponentFixture, RadioButtonGroupComponent, RadioButtonComponent]
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

  describe('click', () => {
    function clickRadio(index: number) {
      const hosts: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('ngx-radiobutton'));
      hosts[index].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      tick();
      fixture.detectChanges();
    }

    it('should keep the selected radio checked when it is clicked again', fakeAsync(() => {
      const radios = component.radioButtonGroup._radios.toArray();
      expect(radios[0].checked).toBe(true);

      clickRadio(0);

      expect(radios[0].checked).toBe(true);
      expect(component.radioButtonGroup.value).toBe('one');
      expect(component.value).toBe('one');
    }));

    it('should select a sibling and deselect the previous radio', fakeAsync(() => {
      const radios = component.radioButtonGroup._radios.toArray();

      clickRadio(1);

      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);
      expect(component.radioButtonGroup.value).toBe('two');
      expect(component.radioButtonGroup.selected).toBe(radios[1]);
    }));

    it('should not change selection when the group is disabled', fakeAsync(() => {
      component.disabled$.next(true);
      fixture.detectChanges();
      const radios = component.radioButtonGroup._radios.toArray();

      clickRadio(1);

      expect(radios[0].checked).toBe(true);
      expect(radios[1].checked).toBe(false);
      expect(component.radioButtonGroup.value).toBe('one');
    }));
  });
});
