import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputComponent } from './input.component';
import { InputTypes } from './input-types.enum';
import { InputComponentFixture } from './input.component.fixture';

const MOCK_EVENT: any = {
  target: {},
  stopPropagation: () => ({})
};

describe('InputComponent', () => {
  let component: InputComponentFixture;
  let fixture: ComponentFixture<InputComponentFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InputComponentFixture, InputComponent],
      imports: [FormsModule, BrowserAnimationsModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponentFixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component.input).toBeTruthy();
  });

  it('should change model value', () => {
    component.input.value = 'testing123';
    fixture.detectChanges();
    expect(component.value).toEqual(component.input.value);
  });

  it('should focus input', () => {
    const spy = spyOn(component.input.focus, 'emit');
    component.input.autoSelect = true;
    component.input.onFocus(MOCK_EVENT);
    expect(spy).toHaveBeenCalled();
  });

  it('should be textarea', () => {
    component.type$.next(InputTypes.textarea);
    fixture.detectChanges();
    expect(component.input.element.nativeElement.type).toEqual(InputTypes.textarea);
  });

  it('should be disabled', () => {
    component.disabled$.next(true);
    fixture.detectChanges();
    expect(component.input.disabled).toEqual(true);
  });

  it('should be readonly', () => {
    component.readonly$.next(true);
    fixture.detectChanges();
    expect(component.input.readonly).toEqual(true);
  });

  it('should emit changes', () => {
    const spy = spyOn(component.input.change, 'emit');
    component.input.onChange(MOCK_EVENT);
    expect(spy).toHaveBeenCalledWith(component.input.value);
  });

  it('should emit keyup', () => {
    const spy = spyOn(component.input.keyup, 'emit');
    component.input.onKeyUp(MOCK_EVENT);
    expect(spy).toHaveBeenCalledWith(MOCK_EVENT);
  });

  it('should blur', () => {
    const spy = spyOn(component.input.blur, 'emit');
    component.input.onBlur(MOCK_EVENT);
    expect(spy).toHaveBeenCalled();
  });

  it('should execute registered onTouchedCallback on blur', () => {
    const onTouchedCallback = jasmine.createSpy();
    component.input.registerOnTouched(onTouchedCallback);
    component.input.onBlur(MOCK_EVENT);
    expect(onTouchedCallback).toHaveBeenCalled();
  });

  describe('password', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(InputComponentFixture);
      component = fixture.componentInstance;
      component.type$.next(InputTypes.password);
      fixture.detectChanges();
    });

    it('should toggle password visibility', () => {
      expect(component.input.type$.value).toEqual(InputTypes.password);
      component.input.togglePassword();
      expect(component.input.type$.value).toEqual(InputTypes.text);
    });

    it('should clear password on unlock', () => {
      component.value = 'password';
      fixture.detectChanges();
      expect(component.input.type$.value).toEqual(InputTypes.password);
      component.input.unlock();
      expect(component.input.value).toEqual('');
      expect(component.input.disabled).toEqual(false);
    });
  });

  describe('validate', () => {
    let control: FormControl;

    beforeEach(() => {
      fixture = TestBed.createComponent(InputComponentFixture);
      component = fixture.componentInstance;
      component.autoSelect$.next(true);
      component.min$.next(2);
      component.max$.next(10);
      control = new FormControl('testing');
      fixture.detectChanges();
    });

    it('should not validate if input is not a number', () => {
      expect(component.input.validate(control)).toEqual(null);
    });

    it('should be valid number input', () => {
      component.type$.next(InputTypes.number);
      fixture.detectChanges();
      expect(component.input.validate(control)).toBeDefined();
    });

    it('should be invalid number input', () => {
      control.setValue('ttttttttttttttttttttttttttttttt');
      component.type$.next(InputTypes.number);
      fixture.detectChanges();
      expect(component.input.validate(control)).toEqual({});
    });
  });

  describe('value', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(InputComponentFixture);
      component = fixture.componentInstance;
      component.autofocus$.next(true);
      component.value = '';
      fixture.detectChanges();
    });

    it('should not change model if value is identical', () => {
      const cbs = { onChange: () => ({}) };
      component.input.registerOnChange(cbs.onChange);
      const spy = spyOn(cbs, 'onChange');
      component.input.value = '';
      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('numeric values', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(InputComponentFixture);
      component = fixture.componentInstance;
      component.type$.next(InputTypes.number);
      fixture.detectChanges();
    });

    it('should coerce inputs to number', () => {
      component.input.value = '5';
      fixture.detectChanges();
      expect(component.input.value as any).toEqual(5);
      expect(component.input.valueAsNumber).toEqual(5);
      expect(component.input.valueAsString).toEqual('5');
    });

    it('should preserve null', () => {
      component.input.value = null;
      fixture.detectChanges();
      expect(component.input.value as any).toEqual(null);
      expect(component.input.valueAsNumber).toEqual(null);
      expect(component.input.valueAsString).toEqual('');
    });

    it('should coerce other inputs to null', () => {
      component.input.value = '';
      fixture.detectChanges();
      expect(component.input.value as any).toEqual(null);
      expect(component.input.valueAsNumber).toEqual(null);
      expect(component.input.valueAsString).toEqual('');
    });

    it('should all engineering notation', () => {
      component.input.value = '1e10';
      fixture.detectChanges();
      expect(component.input.value as any).toEqual(10000000000);
      expect(component.input.valueAsNumber).toEqual(10000000000);
      expect(component.input.valueAsString).toEqual('1e10');

      component.input.value = '-1E-10';
      fixture.detectChanges();
      expect(component.input.value as any).toEqual(-1e-10);
      expect(component.input.valueAsNumber).toEqual(-1e-10);
      expect(component.input.valueAsString).toEqual('-1E-10');
    });
  });

  describe('incrementValue', () => {
    beforeEach(() => {
      component.type$.next(InputTypes.number);
    });

    it('should not increment if input disabled', () => {
      component.input.value = '5';
      component.input.disabled = true;
      fixture.detectChanges();
      expect(component.input.valueAsNumber).toEqual(5);

      component.input.incrementValue(new MouseEvent('mousedown'));
      component.input.clearSpinnerInterval();

      expect(component.input.valueAsNumber).toBe(5);
    });

    it('should set to 1 if input value is falsy', () => {
      component.input.value = undefined;
      fixture.detectChanges();
      expect(component.input.valueAsNumber).toEqual(null);

      component.input.incrementValue(new MouseEvent('mousedown'));
      component.input.clearSpinnerInterval();

      expect(component.input.valueAsNumber).toEqual(1);
    });

    it('should increment input value by 1', fakeAsync(() => {
      component.input.value = 41;
      fixture.detectChanges();
      expect(component.input.valueAsNumber).toEqual(41);
      tick(50);

      component.input.incrementValue(new MouseEvent('mousedown'));
      component.input.clearSpinnerInterval();
      fixture.detectChanges();

      expect(component.input.valueAsNumber).toEqual(42);
    }));
  });

  describe('decrementValue', () => {
    beforeEach(() => {
      component.type$.next(InputTypes.number);
    });

    it('should not decrement if input disabled', () => {
      component.input.value = 41;
      component.input.disabled = true;
      fixture.detectChanges();
      expect(component.input.valueAsNumber).toEqual(41);

      component.input.decrementValue(new MouseEvent('mousedown'));
      component.input.clearSpinnerInterval();

      expect(component.input.valueAsNumber).toEqual(41);
    });

    it('should set to -1 if input value is falsy', fakeAsync(() => {
      component.input.value = undefined;
      fixture.detectChanges();
      expect(component.input.valueAsNumber).toEqual(null);

      component.input.decrementValue(new MouseEvent('mousedown'));
      component.input.clearSpinnerInterval();

      expect(component.input.valueAsNumber).toEqual(-1);
    }));

    it('should decrement input value by 1', fakeAsync(() => {
      component.input.value = 41;
      fixture.detectChanges();
      expect(component.input.valueAsNumber).toEqual(41);
      tick(50);

      component.input.decrementValue(new MouseEvent('mousedown'));
      component.input.clearSpinnerInterval();

      expect(component.input.valueAsNumber).toEqual(40);
    }));
  });

  describe('unlockable', () => {
    let lockBtn: DebugElement;

    beforeEach(() => {
      component.unlockable$.next(true);
      fixture.detectChanges();

      lockBtn = fixture.debugElement.queryAll(By.css('button.ngx-input__lock-toggle'))[0];
    });

    it('should show unlock button', () => {
      expect(lockBtn).toBeDefined();
    });

    it('should be disabled by default', () => {
      expect(component.input.disabled).toBeTrue();
    });

    it('should NOT be disabled when lock button clicked', () => {
      lockBtn.triggerEventHandler('click', null);
      expect(component.input.disabled).toBeFalse();
    });

    it('should remove lock button from DOM when unlocked', () => {
      lockBtn.triggerEventHandler('click', null);
      fixture.detectChanges();

      const lockBtnAfter = fixture.debugElement.queryAll(By.css('button.ngx-input__lock-toggle'))[0];
      expect(lockBtnAfter).not.toBeDefined();
    });
  });
});
