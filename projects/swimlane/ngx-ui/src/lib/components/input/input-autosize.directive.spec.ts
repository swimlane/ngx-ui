import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as faker from 'faker/locale/en';

import { AutosizeDirective } from './input-autosize.directive';
import { AutosizeDirectiveFixture } from './input-autosave.directive.fixture';
import { InputTypes } from './input-types.enum';

describe('AutosizeDirective', () => {
  let component: AutosizeDirectiveFixture;
  let fixture: ComponentFixture<AutosizeDirectiveFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AutosizeDirectiveFixture, AutosizeDirective],
      imports: [FormsModule, BrowserAnimationsModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutosizeDirectiveFixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be enabled', () => {
    expect(component.autosize?.enabled).toBeTruthy();
  });

  describe('textarea', () => {
    beforeEach(() => {
      component.type$.next(InputTypes.textarea);
      fixture.detectChanges();
    });

    it('should be defined', () => {
      expect(component.textarea.nativeElement).toBeTruthy();
    });

    it('should set height on input', () => {
      const el = component.textarea.nativeElement;
      // jsdom has no real layout; use accessor properties so they override any prototype getters.
      Object.defineProperty(el, 'clientHeight', { configurable: true, get: () => 40 });
      Object.defineProperty(el, 'scrollHeight', { configurable: true, get: () => 100 });
      el.value = faker.random.words(500);
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(el.style.height).toBe('100px');
    });

    it('should set height auto when no scroll', () => {
      const el = component.textarea.nativeElement;
      // jsdom does not implement a layout engine, which is required to calculate physical dimensions like clientHeight, scrollHeight, and offsetHeight
      Object.defineProperty(el, 'clientHeight', { configurable: true, get: () => 40 });
      Object.defineProperty(el, 'scrollHeight', { configurable: true, get: () => 40 });
      el.value = '';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(el.style.height).toEqual('auto');
    });

    it('should do nothing when disabled', () => {
      const el = component.textarea.nativeElement;
      // jsdom does not implement a layout engine, which is required to calculate physical dimensions like clientHeight, scrollHeight, and offsetHeight
      Object.defineProperty(el, 'clientHeight', { configurable: true, get: () => 40 });
      Object.defineProperty(el, 'scrollHeight', { configurable: true, get: () => 100 });
      component.enabled$.next(false);
      fixture.detectChanges();

      el.value = faker.random.words(500);
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(el.style.height).not.toBe('100px');
      expect(el.style.height).not.toBe('auto');
    });
  });
});
