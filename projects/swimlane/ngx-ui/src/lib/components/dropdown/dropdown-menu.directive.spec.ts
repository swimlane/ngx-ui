import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DropdownMenuDirective } from './dropdown-menu.directive';
import { stubIntersectionObserverIfNeeded } from '../../testing/stub-intersection-observer';

@Component({
  template: `<ngx-dropdown-menu></ngx-dropdown-menu>`,
  standalone: false
})
class DropdownMenuDirectiveFixture {}

describe('DropdownMenuDirective', () => {
  let directive: DropdownMenuDirective;
  let fixture: ComponentFixture<DropdownMenuDirectiveFixture>;

  beforeAll(() => {
    stubIntersectionObserverIfNeeded();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownMenuDirective, DropdownMenuDirectiveFixture],
      teardown: { destroyAfterEach: false }
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenuDirectiveFixture);
    fixture.detectChanges();
    directive = fixture.debugElement.query(By.directive(DropdownMenuDirective)).injector.get(DropdownMenuDirective);
  });

  it('should be defined', () => {
    expect(directive).toBeTruthy();
  });

  it('should expose the host element', () => {
    expect(directive.element).toBeTruthy();
  });

  it('should forward options and expose inViewportAction', () => {
    expect(() => {
      directive.options = { partial: false };
    }).not.toThrow();
    expect(directive.getCallbackFn()).toBeTruthy();
  });
});
