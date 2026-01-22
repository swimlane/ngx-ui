import { vi, type Mock } from 'vitest';
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
    let spy: Mock;

    beforeEach(() => {
      const component = {
        instance: {
          close: new EventEmitter<void>(),
          pause: new EventEmitter<void>(),
          resume: new EventEmitter<void>()
        }
      };
      spy = vi.spyOn(injectionService, 'appendComponent').mockReturnValue(component as any);
    });

    it('should create notification', () => {
      const ref = service.create({});
      expect(ref).toBeDefined();
      expect(spy).toHaveBeenCalled();
    });

    it('should do nothing if flooded', () => {
      vi.spyOn(service, 'isFlooded').mockReturnValue(true);
      const ref = service.create({ rateLimit: true });
      expect(ref).toBeUndefined();
    });

    it('should remove first item if limit reached', () => {
      const destroySpy = vi.spyOn(service, 'destroy');
      vi.spyOn(service, 'getByType').mockReturnValue([0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as any);
      const ref = service.create({});
      expect(ref).toBeDefined();
      expect(destroySpy).toHaveBeenCalled();
    });

    it('should create native notification', () => {
      const nativeSpy = vi.spyOn(service, 'showNative');
      service.create({ type: NotificationType.native });
      expect(nativeSpy).toHaveBeenCalled();
    });
  });

  describe('startTimer', () => {
    let spy: Mock;

    beforeEach(() => {
      spy = vi.spyOn(service, 'destroy');
    });

    it('should set destroy timeout', async () => {
      service.startTimer({ instance: { timeout: 0 } } as any);
      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
      }, 0);
    });

    it('should not set destroy timeout if !timeout', async () => {
      service.startTimer({ instance: { timeout: false } } as any);
      setTimeout(() => {
        expect(spy).not.toHaveBeenCalled();
      }, 0);
    });
  });

  describe('pauseTimer', () => {
    it('should pause timer', () => {
      const spy = vi.spyOn(window, 'clearTimeout');
      service.pauseTimer({ instance: { timer: {} } } as any);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('requestPermissions', () => {
    let spy: Mock;

    beforeEach(() => {
      spy = vi.spyOn(Notification, 'requestPermission');
    });

    it('should not request permission when native not supported', () => {
      vi.spyOn(service, 'isNativeSupported', 'get').mockReturnValue(false);
      service.requestPermissions();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should request permissions when native supported', () => {
      vi.spyOn(service, 'isNativeSupported', 'get').mockReturnValue(true);
      service.requestPermissions();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('assignDefaults', () => {
    it('should assign default options to component', () => {
      const ts = new Date().getTime();
      const options = service.assignDefaults({});
      expect(options?.inputs?.timestamp).toBeGreaterThanOrEqual(ts);
    });
  });

  describe('injectComponent', () => {
    let spy: Mock;

    beforeEach(() => {
      spy = vi.spyOn(injectionService, 'appendComponent');
    });

    it('should create container if doesnt exist', () => {
      vi.spyOn(document, 'contains').mockReturnValue(false);
      service.injectComponent({} as any, {});
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should not create container if exists', () => {
      vi.spyOn(document, 'contains').mockReturnValue(true);
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
      const spy = vi.spyOn(service, 'destroy');
      service.createSubscriptions(component as any);
      component.instance.close.emit();
      expect(spy).toHaveBeenCalled();
    });

    it('should pause timer on pause', () => {
      const spy = vi.spyOn(service, 'pauseTimer');
      service.createSubscriptions(component as any);
      component.instance.pause.emit();
      expect(spy).toHaveBeenCalled();
    });

    it('should start timer on resume', () => {
      const spy = vi.spyOn(service, 'startTimer');
      service.createSubscriptions(component as any);
      component.instance.resume.emit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('isFlooded', () => {
    let notifications: Array<ComponentRef<NotificationComponent>>;

    beforeEach(() => {
      notifications = [notificationMock() as any, notificationMock() as any, notificationMock() as any];

      vi.spyOn(service, 'getByType').mockReturnValue(notifications);
    });

    it('should be false', () => {
      expect(service.isFlooded({})).toBeFalsy();
    });

    it('should be true', () => {
      expect(
        service.isFlooded({
          title: notifications[0].instance.title,
          body: notifications[0].instance.body,
          timestamp: (notifications[0]?.instance?.timestamp ?? 0) - 2000
        })
      ).toBeTruthy();
    });
  });

  describe('showNative', () => {
    it('should do nothing if native not supported', () => {
      vi.spyOn(service, 'isNativeSupported', 'get').mockReturnValue(false);
      const notification = service.showNative({});
      expect(notification).toBeUndefined();
    });

    it('should request permissions', () => {
      vi.spyOn(service, 'isNativeSupported', 'get').mockReturnValue(true);
      const spy = vi.spyOn(service, 'requestPermissions');
      service.showNative({});
      expect(spy).toHaveBeenCalled();
    });

    it('should do nothing if permissions denied', () => {
      vi.spyOn(service, 'isNativeSupported', 'get').mockReturnValue(true);
      service.permission = 'denied';
      expect(service.showNative({})).toBeUndefined();
    });

    it('should not set timeout', () => {
      vi.spyOn(service, 'isNativeSupported', 'get').mockReturnValue(true);
      const spy = vi.spyOn(service, 'requestPermissions');
      const timeoutSpy = vi.spyOn(window, 'setTimeout');
      service.showNative({ timeout: false });
      expect(spy).toHaveBeenCalled();
      expect(timeoutSpy).not.toHaveBeenCalled();
    });
  });
});
