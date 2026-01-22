import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LongPressButtonComponent } from './long-press-button.component';
import { LongPressButtonState } from './long-press-button-state.enum';

describe('LongPressButtonComponent', () => {
  let component: LongPressButtonComponent;
  let fixture: ComponentFixture<LongPressButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule],
      declarations: [LongPressButtonComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongPressButtonComponent);
    component = fixture.componentInstance;
    component.duration = 0;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateState on change', () => {
    const spy = spyOn(component, 'updateState');
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });

  describe('updateState', () => {
    it('should update state when state undefined', () => {
      component.state = undefined;
      component.updateState();
      expect(component.state).toBe(LongPressButtonState.Active);
    });

    it('should update state when state is submitted', done => {
      component.state = LongPressButtonState.Submitted;
      component.updateState();
      expect(component.disabled).toBe(true);

      setTimeout(() => {
        expect(component.state).toBe(LongPressButtonState.Active);
        expect(component.disabled).toBe(false);
        done();
      }, 3000);
    });
  });

  describe('onLongPressStart', () => {
    afterEach(() => {
      component.pressed = false;
    });

    it('should be pressed', () => {
      component.onLongPressStart();
      expect(component.pressed).toBe(true);
    });

    it('should not press if disabled', () => {
      component.disabled = true;
      component.onLongPressStart();
      expect(component.pressed).toBe(false);
    });
  });

  describe('onLongPressFinish', () => {
    beforeEach(() => {
      component.pressed = true;
      component.state = LongPressButtonState.Active;
    });

    it('should stop pressing and submit', () => {
      const spy = spyOn(component.longPress, 'emit');
      component.onLongPressFinish(true);
      expect(component.pressed).toBe(false);
      expect(component.state).toBe(LongPressButtonState.Submitted);
      expect(spy).toHaveBeenCalled();
    });

    it('should not stop pressing or submit if disabled', () => {
      component.disabled = true;
      const spy = spyOn(component.longPress, 'emit');
      component.onLongPressFinish(true);
      expect(component.pressed).toBe(true);
      expect(component.state).toBe(LongPressButtonState.Active);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onLongPressCancel', () => {
    beforeEach(() => {
      component.pressed = true;
    });

    it('should cancel press', () => {
      component.onLongPressCancel();
      expect(component.pressed).toBe(false);
    });
  });
});
