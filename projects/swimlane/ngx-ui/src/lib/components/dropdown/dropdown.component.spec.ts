/* eslint-disable security/detect-non-literal-fs-filename */
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DropdownComponent } from './dropdown.component';
import { DropdownComponentFixture } from './fixtures/dropdown.component.fixture';
import { DropdownModule } from './dropdown.module';

describe('DropdownComponent', () => {
  let component: DropdownComponentFixture;
  let fixture: ComponentFixture<DropdownComponentFixture>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DropdownModule],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponentFixture);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.directive(DropdownComponent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle on click', () => {
    const spy = vi.spyOn(component.dropdown, 'onToggleClick');
    component.dropdown.dropdownToggle.onClick({ preventDefault: () => undefined } as any);
    expect(spy).toHaveBeenCalled();
  });

  describe('onDocumentClick', () => {
    it('should close on outside click', () => {
      component.dropdown.open = true;
      const el = document.createElement('div');
      component.dropdown.onDocumentClick({ target: el } as any);
      expect(component.dropdown.open).toBe(false);
    });

    it('should not close on outside click', () => {
      component.dropdown.open = true;
      component.dropdown.closeOnOutsideClick = false;
      const el = document.createElement('div');
      component.dropdown.onDocumentClick({ target: el } as any);
      expect(component.dropdown.open).toBe(true);
    });

    it('should close on on menu click', () => {
      component.dropdown.open = true;
      component.dropdown.closeOnClick = false;
      const el = document.createElement('div');
      component.dropdown.onDocumentClick({ target: el } as any);
      expect(component.dropdown.open).toBe(false);
    });

    it('should not close on menu click', () => {
      component.dropdown.open = true;
      component.dropdown.closeOnClick = false;
      const el = component.dropdown.dropdownMenu.element.firstChild;
      component.dropdown.onDocumentClick({ target: el } as any);
      expect(component.dropdown.open).toBe(true);
    });

    it('should call document listener on close', () => {
      component.dropdown.open = false;
      component.dropdown.closeOnClick = false;
      component.dropdown.onToggleClick(undefined);
      const el = document.createElement('div');
      component.dropdown.onDocumentClick({ target: el } as any);
      expect(component.dropdown.open).toBe(false);
    });
  });

  describe('onToggleClick', () => {
    it('should toggle menu to open', () => {
      component.dropdown.onToggleClick(undefined);
      expect(component.dropdown.open).toBe(true);
    });

    it('should toggle menu to close', () => {
      component.dropdown.onToggleClick(undefined);
      component.dropdown.onToggleClick(undefined);
      expect(component.dropdown.open).toBe(false);
    });
  });

  describe('DropdownToggleDirective', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DropdownComponentFixture);
      component = fixture.componentInstance;
      component.hasToggler$.next(false);
      fixture.detectChanges();
    });

    it('should not have a toggler', () => {
      expect(component.dropdown.dropdownToggle).toBeFalsy();
    });
  });

  describe('closeOnMouseLeave', () => {
    it('should not close on mouseleave if closeOnMouseLeave is not true', () => {
      component.dropdown.open = true;
      debugElement.triggerEventHandler('mouseleave', null);
      expect(component.dropdown.open).toBe(true);
    });

    it('should close on mouseleave', fakeAsync(() => {
      component.dropdown.closeOnMouseLeave = true;
      component.dropdown.open = true;
      debugElement.triggerEventHandler('mouseleave', null);
      tick(1200);
      expect(component.dropdown.open).toBe(false);
    }));
  });

  describe('closeDropdownWhenCloseMethodIsCalled', () => {
    it('should close the dropdown when the close method is called', () => {
      component.dropdown.open = true;
      component.dropdown.close();
      expect(component.dropdown.open).toBe(false);
    });
  });
});
