import { TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

import { InjectionService } from '../../services/injection/injection.service';
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
    service = TestBed.inject(DrawerService);
    overlayService = TestBed.inject(OverlayService);
    injectionService = TestBed.inject(InjectionService);
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
      const spy = vi.spyOn(injectionService, 'appendComponent').mockReturnValue(component as any);
      const destroySpy = vi.spyOn(service, 'destroy');

      service.create({});
      expect(spy).toHaveBeenCalled();
      component.instance.close.emit();
      expect(destroySpy).toHaveBeenCalled();
    });

    it('should kill subscriptions when component closes and is not a root component', () => {
      const component = {
        instance: {
          close: new EventEmitter<boolean>(),
          zIndex: 10,
          size: 10,
          isRoot: false
        }
      };
      const spy = vi.spyOn(injectionService, 'appendComponent').mockReturnValue(component as any);
      const destroySpy = vi.spyOn(service, 'destroy');

      service.create({ isRoot: false });
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
      const spy = vi.spyOn(injectionService, 'appendComponent').mockReturnValue(component as any);
      const destroySpy = vi.spyOn(service, 'destroy');

      service.create({
        zIndex: 10,
        size: 10,
        closeOnOutsideClick: true
      });
      expect(spy).toHaveBeenCalled();
      component.instance.close.emit();
      expect(destroySpy).toHaveBeenCalled();
    });

    it('should create with isRoot set to false and a parent container supplied', () => {
      const component = {
        instance: {
          close: new EventEmitter<boolean>(),
          zIndex: 10,
          size: 10,
          closeOnOutsideClick: true,
          isRoot: false
        }
      };
      const spy = vi.spyOn(injectionService, 'appendComponent').mockReturnValue(component as any);
      const destroySpy = vi.spyOn(service, 'destroy');

      const parentElement = document.createElement('div');

      service.create({
        zIndex: 10,
        size: 10,
        closeOnOutsideClick: true,
        isRoot: false,
        parentContainer: parentElement
      });

      expect(spy).toHaveBeenCalled();
      component.instance.close.emit();
      expect(destroySpy).toHaveBeenCalled();
    });

    it('Clicking on parent element destroys component when closeOnOutsideClick is true', () => {
      const component = {
        instance: {
          close: new EventEmitter<boolean>(),
          zIndex: 10,
          size: 10,
          closeOnOutsideClick: true,
          isRoot: false
        }
      };
      const spy = vi.spyOn(injectionService, 'appendComponent').mockReturnValue(component as any);
      const destroySpy = vi.spyOn(service, 'destroy');

      const parentElement = document.createElement('div');

      service.create({
        zIndex: 10,
        size: 10,
        closeOnOutsideClick: true,
        isRoot: false,
        parentContainer: parentElement
      });

      expect(spy).toHaveBeenCalled();
      parentElement.dispatchEvent(new Event('click'));
      expect(destroySpy).toHaveBeenCalled();
    });
  });

  describe('destroy', () => {
    it('should destroy with overlay', async () => {
      const spy = vi.spyOn(overlayService, 'removeTriggerComponent');
      const component: any = { instance: { size: 10 } };
      service.destroy(component);

      setTimeout(() => {
        expect(component.instance.size).toEqual(0);
        expect(spy).toHaveBeenCalled();
      }, 10);
    });

    it('should not set size to 0 if !component', async () => {
      const spy = vi.spyOn(overlayService, 'removeTriggerComponent');
      const component: any = {};
      service.destroy(component);

      setTimeout(() => {
        expect(component.instance).toBeUndefined();
        expect(spy).toHaveBeenCalled();
      }, 10);
    });
  });
});
