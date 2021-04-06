import { ApplicationRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DialogComponent],
        imports: [NoopAnimationsModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('visibleState', () => {
    it('should be active', () => {
      component.visible = true;
      expect(component.visibleState).toEqual('active');
    });

    it('should be inactive', () => {
      component.visible = false;
      expect(component.visibleState).toEqual('inactive');
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DialogComponent);
      component = fixture.componentInstance;
    });

    it('should show if visible', () => {
      const spy = spyOn(component, 'show');
      component.visible = true;
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });

    it('should set dialogTitle if title set', () => {
      component.title = 'test';
      fixture.detectChanges();
      expect(component.dialogTitle).toEqual(component.title);
    });
  });

  describe('show', () => {
    it('should be visible and emit open event', () => {
      const spy = spyOn(component.open, 'emit');
      component.show();
      expect(component.visible).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('hide', () => {
    it('should not be visible and emit close event', () => {
      const spy = spyOn(component.close, 'emit');
      component.hide();
      expect(component.visible).toBeFalsy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('containsTarget', () => {
    it('should be true when closeOnBlur and contains dialog', () => {
      const target = { classList: { contains: () => true } };
      component.closeOnBlur = true;
      expect(component.containsTarget(target)).toBeTruthy();
    });

    it('should be false when !closeOnBlur', () => {
      const target = { classList: { contains: () => true } };
      component.closeOnBlur = false;
      expect(component.containsTarget(target)).toBeFalsy();
    });
  });

  describe('onEscapeKeyDown', () => {
    it('should call hide when closeOnEscape', () => {
      const spy = spyOn(component, 'hide');
      component.closeOnEscape = true;
      fixture.nativeElement.dispatchEvent(getEscapeEvent());
      expect(spy).toHaveBeenCalled();
    });

    it('should not call hide when !closeOnEscape', () => {
      const spy = spyOn(component, 'hide');
      component.closeOnEscape = false;
      fixture.nativeElement.dispatchEvent(getEscapeEvent());
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onDocumentClick', () => {
    it('should hide if contains target', () => {
      const spy = spyOn(component, 'containsTarget').and.returnValue(true);
      component.visible = true;
      document.dispatchEvent(new Event('click'));
      expect(spy).toHaveBeenCalled();
      expect(component.visible).toBeFalsy();
    });

    it('should not hide if doesnt contain target', () => {
      const spy = spyOn(component, 'containsTarget').and.returnValue(false);
      component.visible = true;
      document.dispatchEvent(new Event('click'));
      expect(spy).toHaveBeenCalled();
      expect(component.visible).toBeTruthy();
    });
  });

  describe('change detection', () => {
    it('should not run change detection if the `closeOnEscape` is falsy', () => {
      const appRef = TestBed.inject(ApplicationRef);
      const spy = spyOn(appRef, 'tick');

      component.closeOnEscape = false;

      const event = getEscapeEvent();
      fixture.nativeElement.dispatchEvent(event);
      fixture.nativeElement.dispatchEvent(event);

      expect(spy).toHaveBeenCalledTimes(0);

      component.closeOnEscape = true;
      fixture.nativeElement.dispatchEvent(event);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not run change detection if does not contain target', () => {
      const appRef = TestBed.inject(ApplicationRef);
      const spy = spyOn(appRef, 'tick');

      component.closeOnBlur = false;
      document.dispatchEvent(new Event('click'));
      document.dispatchEvent(new Event('click'));

      expect(spy).toHaveBeenCalledTimes(0);

      spyOn(component, 'containsTarget').and.returnValue(true);
      document.dispatchEvent(new Event('click'));

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

function getEscapeEvent() {
  const event = new KeyboardEvent('keydown');
  // There seems to be an issue with TS typings since the type-checker throws:
  // Object literal may only specify known properties, and 'keyCode' does not exist in type 'KeyboardEventInit'.
  Object.defineProperty(event, 'keyCode', {
    get: () => 27
  });
  return event;
}
