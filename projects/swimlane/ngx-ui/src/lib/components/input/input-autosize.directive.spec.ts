import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as faker from 'faker';

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

  describe('input', () => {
    beforeEach(() => {
      component.type$.next(InputTypes.text);
      fixture.detectChanges();
    });

    it('should be defined', () => {
      expect(component.input.nativeElement).toBeTruthy();
    });

    it('should set width on input', () => {
      component.input.nativeElement.value = faker.random.words(5);
      component.input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.input.nativeElement.style.width).not.toEqual('auto');
    });

    it('should do nothing when disabled', () => {
      component.enabled$.next(false);
      fixture.detectChanges();

      component.input.nativeElement.value = faker.random.words(5);
      component.input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.input.nativeElement.scrollWidth).not.toEqual(component.input.nativeElement.clientWidth);
    });

    it('should not extend past max width', () => {
      component.maxWidth$.next(100);
      fixture.detectChanges();

      component.input.nativeElement.value = faker.random.words(500);
      component.input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.input.nativeElement.style.maxWidth).toEqual('100px');
      expect(component.input.nativeElement.clientWidth).toBeLessThanOrEqual(component.input.nativeElement.scrollWidth);
    });

    it('should set width auto when no scroll', () => {
      component.input.nativeElement.value = '';
      component.input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.input.nativeElement.style.width).toEqual('auto');
    });
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
      component.textarea.nativeElement.value = faker.random.words(500);
      component.textarea.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.textarea.nativeElement.style.height).not.toEqual('auto');
    });

    it('should set height auto when no scroll', () => {
      component.textarea.nativeElement.value = '';
      component.textarea.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.textarea.nativeElement.style.height).toEqual('auto');
    });

    it('should do nothing when disabled', () => {
      component.enabled$.next(false);
      fixture.detectChanges();

      component.textarea.nativeElement.value = faker.random.words(500);
      component.textarea.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.textarea.nativeElement.scrollHeight).not.toEqual(component.textarea.nativeElement.offsetHeight);
    });
  });
});
