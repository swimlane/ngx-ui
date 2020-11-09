import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownComponent } from './dropdown.component';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownComponentFixture } from './fixtures/dropdown.component.fixture';
import { DropdownShowTypes } from './dropdown.show-types.enum';

describe('DropdownToggleDirective', () => {
  let directive: DropdownToggleDirective;
  let fixture: ComponentFixture<DropdownComponentFixture>;
  let debugElement: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DropdownComponent, DropdownMenuDirective, DropdownToggleDirective, DropdownComponentFixture]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponentFixture);
    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.directive(DropdownToggleDirective));
    directive = debugElement.injector.get(DropdownToggleDirective);
  });

  it('should be defined', () => {
    expect(directive).toBeTruthy();
  });

  describe('show events', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(directive.toggle, 'emit');
    });

    describe('onClick', () => {
      it('should toggle', () => {
        debugElement.triggerEventHandler('click', { preventDefault: () => undefined });
        expect(spy).toHaveBeenCalled();
      });

      it('should not toggle when disabled', () => {
        directive.disabled = true;
        debugElement.triggerEventHandler('click', { preventDefault: () => undefined });
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('onDblClick', () => {
      it('should not toggle by default', () => {
        debugElement.triggerEventHandler('dblclick', { preventDefault: () => undefined });
        expect(spy).not.toHaveBeenCalled();
      });

      it('should toggle', () => {
        directive.showEvent = DropdownShowTypes.Dblclick;
        debugElement.triggerEventHandler('dblclick', { preventDefault: () => undefined });
        expect(spy).toHaveBeenCalled();
      });

      it('should not toggle when disabled', () => {
        directive.showEvent = DropdownShowTypes.Dblclick;
        directive.disabled = true;
        debugElement.triggerEventHandler('dblclick', { preventDefault: () => undefined });
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('onContextmenu', () => {
      it('should not toggle by default', () => {
        debugElement.triggerEventHandler('contextmenu', { preventDefault: () => undefined });
        expect(spy).not.toHaveBeenCalled();
      });

      it('should toggle', () => {
        directive.showEvent = DropdownShowTypes.Contextmenu;
        debugElement.triggerEventHandler('contextmenu', { preventDefault: () => undefined });
        expect(spy).toHaveBeenCalled();
      });

      it('should not toggle when disabled', () => {
        directive.showEvent = DropdownShowTypes.Contextmenu;
        directive.disabled = true;
        debugElement.triggerEventHandler('contextmenu', { preventDefault: () => undefined });
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
