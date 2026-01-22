import { TestBed } from '@angular/core/testing';
import { ComponentRef, EventEmitter } from '@angular/core';

import { InjectionService } from '../../services/injection/injection.service';
import { NotificationService } from './notification.service';
import { NotificationType } from './notification-type.enum';
import { notificationMock } from './notification.mock';
import { NotificationComponent } from './notification.component';

describe('NotificationService', () => {
  let service: NotificationService;
  let injectionService: InjectionService;

  beforeEach(() => {
    const injectionServiceStub = {
      appendComponent: () => undefined
    };

    TestBed.configureTestingModule({
      providers: [NotificationService, { provide: InjectionService, useValue: injectionServiceStub }]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(NotificationService);
    injectionService = TestBed.inject(InjectionService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
    expect(injectionService).toBeTruthy();
  });

  it('should test if browser supports native notifications', () => {
    expect(service.isNativeSupported).toBeDefined();
  });

  describe('create', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      const component = {
        instance: {
          close: new EventEmitter<void>(),
          pause: new EventEmitter<void>(),
          resume: new EventEmitter<void>()
        }
      };
      spy = spyOn(injectionService, 'appendComponent').and.returnValue(component as any);
    });

    it('should create notification', () => {
      const ref = service.create({});
      expect(ref).toBeDefined();
      expect(spy).toHaveBeenCalled();
    });

    it('should do nothing if flooded', () => {
      spyOn(service, 'isFlooded').and.returnValue(true);
      const ref = service.create({ rateLimit: true });
      expect(ref).toBeUndefined();
    });

    it('should remove first item if limit reached', () => {
      const destroySpy = spyOn(service, 'destroy');
      spyOn(service, 'getByType').and.returnValue([0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as any);
      const ref = service.create({});
      expect(ref).toBeDefined();
      expect(destroySpy).toHaveBeenCalled();
    });

    it('should create native notification', () => {
      const nativeSpy = spyOn(service, 'showNative');
      service.create({ type: NotificationType.native });
      expect(nativeSpy).toHaveBeenCalled();
    });
  });

  describe('startTimer', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(service, 'destroy');
    });

    it('should set destroy timeout', done => {
      service.startTimer({ instance: { timeout: 0 } } as any);
      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should not set destroy timeout if !timeout', done => {
      service.startTimer({ instance: { timeout: false } } as any);
      setTimeout(() => {
        expect(spy).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });

  describe('pauseTimer', () => {
    it('should pause timer', () => {
      const spy = spyOn(window, 'clearTimeout');
      service.pauseTimer({ instance: { timer: {} } } as any);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('requestPermissions', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(Notification, 'requestPermission');
    });

    it('should not request permission when native not supported', () => {
      spyOnProperty(service, 'isNativeSupported').and.returnValue(false);
      service.requestPermissions();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should request permissions when native supported', () => {
      spyOnProperty(service, 'isNativeSupported').and.returnValue(true);
      service.requestPermissions();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('assignDefaults', () => {
    it('should assign default options to component', () => {
      const ts = new Date().getTime();
      const options = service.assignDefaults({});
      expect(options.inputs.timestamp).toBeGreaterThanOrEqual(ts);
    });
  });

  describe('injectComponent', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(injectionService, 'appendComponent');
    });

    it('should create container if doesnt exist', () => {
      spyOn(document, 'contains').and.returnValue(false);
      service.injectComponent({} as any, {});
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should not create container if exists', () => {
      spyOn(document, 'contains').and.returnValue(true);
      service.container = { location: { nativeElement: {} } } as any;
      service.injectComponent({} as any, {});
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createSubscriptions', () => {
    let component: {
      instance: {
        close: EventEmitter<void>;
        pause: EventEmitter<void>;
        resume: EventEmitter<void>;
      };
    };

    beforeEach(() => {
      component = {
        instance: {
          close: new EventEmitter<void>(),
          pause: new EventEmitter<void>(),
          resume: new EventEmitter<void>()
        }
      };
    });

    it('should destroy component on close', () => {
      const spy = spyOn(service, 'destroy');
      service.createSubscriptions(component as any);
      component.instance.close.emit();
      expect(spy).toHaveBeenCalled();
    });

    it('should pause timer on pause', () => {
      const spy = spyOn(service, 'pauseTimer');
      service.createSubscriptions(component as any);
      component.instance.pause.emit();
      expect(spy).toHaveBeenCalled();
    });

    it('should start timer on resume', () => {
      const spy = spyOn(service, 'startTimer');
      service.createSubscriptions(component as any);
      component.instance.resume.emit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('isFlooded', () => {
    let notifications: Array<ComponentRef<NotificationComponent>>;

    beforeEach(() => {
      notifications = [notificationMock() as any, notificationMock() as any, notificationMock() as any];

      spyOn(service, 'getByType').and.returnValue(notifications);
    });

    it('should be false', () => {
      expect(service.isFlooded({})).toBeFalsy();
    });

    it('should be true', () => {
      expect(
        service.isFlooded({
          title: notifications[0].instance.title,
          body: notifications[0].instance.body,
          timestamp: notifications[0].instance.timestamp - 2000
        })
      ).toBeTruthy();
    });
  });

  describe('showNative', () => {
    it('should do nothing if native not supported', () => {
      spyOnProperty(service, 'isNativeSupported').and.returnValue(false);
      const notification = service.showNative({});
      expect(notification).toBeUndefined();
    });

    it('should request permissions', () => {
      spyOnProperty(service, 'isNativeSupported').and.returnValue(true);
      const spy = spyOn(service, 'requestPermissions');
      service.showNative({});
      expect(spy).toHaveBeenCalled();
    });

    it('should do nothing if permissions denied', () => {
      spyOnProperty(service, 'isNativeSupported').and.returnValue(true);
      service.permission = 'denied';
      expect(service.showNative({})).toBeUndefined();
    });

    it('should not set timeout', () => {
      spyOnProperty(service, 'isNativeSupported').and.returnValue(true);
      const spy = spyOn(service, 'requestPermissions');
      const timeoutSpy = spyOn(window, 'setTimeout');
      service.showNative({ timeout: false });
      expect(spy).toHaveBeenCalled();
      expect(timeoutSpy).not.toHaveBeenCalled();
    });
  });
});
