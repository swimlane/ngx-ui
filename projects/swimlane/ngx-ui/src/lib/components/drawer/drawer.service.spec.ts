import { TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

import { InjectionService } from '../../services/injection.service';
import { OverlayService } from '../overlay/overlay.service';
import { DrawerService } from './drawer.service';

describe('DrawerService', () => {
  let service: DrawerService;
  let overlayService: OverlayService;
  let injectionService: InjectionService;

  beforeEach(() => {
    const overlayServiceStub = {
      removeTriggerComponent: () => ({}),
      show: () => ({}),
      click: { subscribe: () => ({ unsubscribe: () => ({}) }) },
      instance: { zIndex: {} }
    };

    const injectionServiceStub = {
      appendComponent: () => undefined
    };

    TestBed.configureTestingModule({
      providers: [
        DrawerService,
        { provide: InjectionService, useValue: injectionServiceStub },
        { provide: OverlayService, useValue: overlayServiceStub }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(DrawerService);
    overlayService = TestBed.get(OverlayService);
    injectionService = TestBed.get(InjectionService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should kill subscriptions when component closes', () => {
      const component = {
        instance: {
          close: new EventEmitter<boolean>(),
          zIndex: 10,
          size: 10
        }
      };
      const spy = spyOn(injectionService, 'appendComponent').and.returnValue(component);
      const destroySpy = spyOn(service, 'destroy');

      service.create({});
      expect(spy).toHaveBeenCalled();
      component.instance.close.emit();
      expect(destroySpy).toHaveBeenCalled();
    });

    it('should create with options and closeOnOutsideClick', () => {
      const component = {
        instance: {
          close: new EventEmitter<boolean>(),
          zIndex: 10,
          size: 10,
          closeOnOutsideClick: true
        }
      };
      const spy = spyOn(injectionService, 'appendComponent').and.returnValue(component);
      const destroySpy = spyOn(service, 'destroy');

      service.create({
        zIndex: 10,
        size: 10,
        closeOnOutsideClick: true
      });
      expect(spy).toHaveBeenCalled();
      component.instance.close.emit();
      expect(destroySpy).toHaveBeenCalled();
    });
  });

  describe('destroy', () => {
    it('should destroy with overlay', done => {
      const spy = spyOn(overlayService, 'removeTriggerComponent');
      const component: any = { instance: { size: 10 } };
      service.destroy(component);

      setTimeout(() => {
        expect(component.instance.size).toEqual(0);
        expect(spy).toHaveBeenCalled();
        done();
      }, 10);
    });

    it('should not set size to 0 if !component', done => {
      const spy = spyOn(overlayService, 'removeTriggerComponent');
      const component: any = {};
      service.destroy(component);

      setTimeout(() => {
        expect(component.instance).toBeUndefined();
        expect(spy).toHaveBeenCalled();
        done();
      }, 10);
    });
  });
});
