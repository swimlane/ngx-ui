import { ApplicationRef } from '@angular/core';
import { BACKSPACE, ESCAPE } from '@angular/cdk/keycodes';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { take } from 'rxjs/operators';

import { DrawerComponent } from './drawer.component';
import { DrawerDirection } from './drawer-direction.enum';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DrawerComponent],
        imports: [NoopAnimationsModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;

    component.size = 10;
    component.zIndex = 10;
    component.closeOnOutsideClick = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.size).toEqual(10);
    expect(component.zIndex).toEqual(10);
    expect(component.closeOnOutsideClick).toEqual(true);
  });

  describe('cssClasses', () => {
    it('should get left drawer classes', () => {
      component.direction = DrawerDirection.Left;
      expect(component.cssClasses).toContain('left-drawer');
    });

    it('should get bottom drawer classes', () => {
      component.direction = DrawerDirection.Bottom;
      expect(component.cssClasses).toContain('bottom-drawer');
    });

    it('should set position to absolute when isRoot is set to false', () => {
      component.isRoot = false;
      component.ngOnInit();
      expect(component.position).toEqual('absolute');
    });
  });

  describe('onEscapeKey', () => {
    it('should close', done => {
      // The `close` subject will emit when there is at least 1 observer.
      const promise = component.close.pipe(take(1)).toPromise();
      fixture.nativeElement.dispatchEvent(createKeyboardEvent(ESCAPE));
      promise.then(closed => {
        expect(closed).toBeTrue();
        done();
      });
    });
  });

  describe('setDimensions', () => {
    it('should set width and size to 100% when component size isnt defined', () => {
      component.direction = DrawerDirection.Left;
      component.setDimensions(undefined);

      expect(component.heightSize).toEqual('100%');
      expect(component.widthSize).toEqual('100%');
    });

    it('should set width to size and height to 100% when drawer direction is left', () => {
      component.direction = DrawerDirection.Left;
      component.setDimensions(50);

      expect(component.heightSize).toEqual('100%');
      expect(component.widthSize).toEqual('50%');
    });

    it('should set height to size and width to 100% when drawer direction is bottom', () => {
      component.direction = DrawerDirection.Bottom;
      component.setDimensions(50);

      expect(component.heightSize).toEqual('50%');
      expect(component.widthSize).toEqual('100%');
    });
  });

  describe('change detection', () => {
    it('should not trigger change detection if any key is pressed except `Escape`', () => {
      const appRef = TestBed.inject(ApplicationRef);
      const spy = spyOn(appRef, 'tick').and.callThrough();
      // The `close` subject will emit when there is at least 1 observer.
      const subscription = component.close.subscribe();

      fixture.nativeElement.dispatchEvent(createKeyboardEvent(BACKSPACE));
      fixture.nativeElement.dispatchEvent(createKeyboardEvent(BACKSPACE));

      expect(spy).toHaveBeenCalledTimes(0);

      fixture.nativeElement.dispatchEvent(createKeyboardEvent(ESCAPE));

      expect(spy).toHaveBeenCalledTimes(1);
      subscription.unsubscribe();
    });
  });
});

function createKeyboardEvent(keyCode: number) {
  const event = new KeyboardEvent('keyup');
  // There seems to be an issue with TS typings since the type-checker throws:
  // Object literal may only specify known properties, and 'keyCode' does not exist in type 'KeyboardEventInit'.
  Object.defineProperty(event, 'keyCode', {
    get: () => keyCode
  });
  return event;
}
