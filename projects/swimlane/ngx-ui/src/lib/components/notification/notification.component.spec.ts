import type { MockInstance } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NotificationComponent } from './notification.component';
import { NotificationModule } from './notification.module';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [NotificationModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;

    component.showClose = false;
    component.pauseOnHover = false;
    component.timestamp = 1000;

    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
    expect(component.showClose).toBeFalsy();
    expect(component.pauseOnHover).toBeFalsy();
    expect(component.timestamp).toEqual(1000);
  });

  describe('cssClasses', () => {
    it('should add css classes', () => {
      component.cssClass = 'test';
      expect(component.cssClasses).toContain('test');
    });

    it('should add closable', () => {
      component.showClose = true;
      expect(component.cssClasses).toContain('notification-closeable');
    });
  });

  describe('onMouseEnter', () => {
    let spy: MockInstance<any>;

    beforeEach(() => {
      spy = vi.spyOn(component.pause, 'emit');
    });

    it('should emit pause when pauseOnHover', () => {
      component.pauseOnHover = true;
      component.onMouseEnter();
      expect(spy).toHaveBeenCalled();
    });

    it('should not emit pause when !pauseOnHover', () => {
      component.pauseOnHover = false;
      component.onMouseEnter();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseLeave', () => {
    let spy: MockInstance<any>;

    beforeEach(() => {
      spy = vi.spyOn(component.resume, 'emit');
    });

    it('should emit resume when pauseOnHover', () => {
      component.pauseOnHover = true;
      component.onMouseLeave();
      expect(spy).toHaveBeenCalled();
    });

    it('should not emit resume when !pauseOnHover', () => {
      component.pauseOnHover = false;
      component.onMouseLeave();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
