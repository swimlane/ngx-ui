import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';

import { InputComponent } from './input.component';
import { InputTypes } from './input-types.enum';
import { take } from 'rxjs/operators';

const MOCK_EVENT: any = {
  stopPropagation: () => ({}),
};

@Component({
  selector: `ngx-test-host-component`,
  template: `
    <ngx-input
      [(ngModel)]="value"
      [type]="type$ | async"
      [disabled]="disabled$ | async"
      [required]="required$ | async"
      [passwordTextVisible]="passwordTextVisible$ | async"
      [autofocus]="autofocus$ | async"
      [autoSelect]="autoSelect$ | async"
      [autocomplete]="autocomplete$ | async"
      [autocorrect]="autocorrect$ | async"
      [spellcheck]="spellcheck$ | async"
      [min]="min$ | async"
      [max]="max$ | async"
    ></ngx-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  value = 'test';
  readonly type$ = new BehaviorSubject(InputTypes.text);
  readonly disabled$ = new BehaviorSubject(false);
  readonly passwordTextVisible$ = new BehaviorSubject(false);
  readonly required$ = new BehaviorSubject(false);
  readonly autofocus$ = new BehaviorSubject(false);
  readonly autoSelect$ = new BehaviorSubject(false);
  readonly autocomplete$ = new BehaviorSubject(true);
  readonly autocorrect$ = new BehaviorSubject(true);
  readonly spellcheck$ = new BehaviorSubject(true);
  readonly min$ = new BehaviorSubject<number>(undefined);
  readonly max$ = new BehaviorSubject<number>(undefined);

  @ViewChild(InputComponent, { static: false })
  readonly input: InputComponent;
}

describe('InputComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TestHostComponent, InputComponent],
      imports: [FormsModule, BrowserAnimationsModule],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
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

  it('should be required', () => {
    component.required$.next(true);
    fixture.detectChanges();
    expect(component.input.requiredIndicatorView).toEqual(component.input.requiredIndicator as string);
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
    expect(spy).toHaveBeenCalled()
  });

  describe('password', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      component.type$.next(InputTypes.password);
      fixture.detectChanges();
    });

    it('should toggle password visibility', () => {
      expect(component.input.type$.value).toEqual(InputTypes.password);
      component.input.togglePassword()
      expect(component.input.type$.value).toEqual(InputTypes.text);
    });
  });

  describe('validate', () => {
    let control: FormControl;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
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
      expect(component.input.validate(control)).toEqual({ });
    });
  });

  describe('value', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      component.autofocus$.next(true);
      component.value = '';
      fixture.detectChanges();
    });

    it('should not change model if value is identical', () => {
      const cbs = { onChange: () => ({ }) };
      component.input.registerOnChange(cbs.onChange);
      const spy = spyOn(cbs, 'onChange');
      component.input.value = '';
      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
